import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import {
  Container,
  Header,
  Form,
  Fieldset,
  Legend,
  Field,
  FieldGroup,
  FieldCheck,
  Leaflet,
  Button,
  ItemsGrid,
  Item,
  Modal
} from './styles';

import logo from '../../assets/logo.svg';

import SelectField from '../../components/SelectField';

import { Map, TileLayer, Marker} from 'react-leaflet';

import { LeafletMouseEvent } from 'leaflet'

import { FiArrowLeft,FiCheckCircle } from 'react-icons/fi';

import {Link} from 'react-router-dom';

import {api} from '../../services/api';
import axios from 'axios';


interface ItemDTO {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
  nome: string;
}

interface IBGECityResponse {
  nome: string;
}

interface Option {
  label:string;
  value:string;
}

const CreatePoint: React.FC = () => {
  const [initialPosition, setInitialPosition] = useState<[number,number]>([0, 0]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })

  const [selectedUF, setSelectedUF] = useState<Option>({label: 'Escolha o estado (UF)'} as Option);
  const [selectedCity, setSelectedCity] = useState<Option>({label: 'Escolha a Cidade'} as Option);
  const [selectedPosition, setSelectedPosition] = useState<[number,number]>([0, 0]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [items, setItems] = useState<ItemDTO[]>([]);
  const [UFOptions, setUFOptions] = useState<Option[]>([])
  const [cityOptions, setCityOptions] = useState<Option[]>([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude])
    });
  }, []);

  useEffect(() => {
    api.get('/items')
      .then( response => {
        setItems(response.data);
      })
      .catch(error => alert('Erro ao carregar items de coleta'));
  }, []);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( response => {
      const ufsResponse = response.data.map(({sigla, nome}) => ({value: sigla, label: nome}))
      setUFOptions(ufsResponse);
    })
  }
  ,[]);

  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF.value}/municipios`)
      .then( response => {
        const cityResponse = response.data.map(({ nome }) => ({value: nome, label: nome}))
        setCityOptions(cityResponse);
      })
  }
  ,[selectedUF]);

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng } = event.latlng;
    setSelectedPosition([lat, lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;
    setFormData({...formData, [name]: value})
  }

  function handleItemClick(clickedItemId: number) {
    if(selectedItems.includes(clickedItemId)) {
      const filteredItems = selectedItems.filter(itemId => itemId !== clickedItemId);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, clickedItemId]);
    }
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const {name, email, whatsapp} = formData;
    const [latitude, longitude] = selectedPosition;
    const uf = selectedUF.value;
    const city = selectedCity.value;
    const items = selectedItems;

    const createPointData = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      uf,
      city,
      items
    }
    console.log(createPointData);

    api.post('/points', createPointData)
    .then(response => {
      setShowModal(true);
    })
    .catch(error => console.log(error));


  }

  return(
    <Container>
      <Header>
          <img src={logo} alt="Ecoleta"/>
          <Link to='/'> <FiArrowLeft/> Voltar para home</Link>
      </Header>
      <Form onSubmit={handleSubmit}>
        <h1>Cadastro do <br/> Ponto de Coleta</h1>

        <Fieldset>
          <Legend>
            <h2>Dados</h2>
          </Legend>

          <Field>
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Field>
          <FieldGroup>
            <Field>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Field>

            <Field>
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
              />
            </Field>
          </FieldGroup>
        </Fieldset>

        <Fieldset>
          <Legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </Legend>

          <Leaflet center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition}/>
          </Leaflet>

          <FieldGroup>
            <Field>
              <label htmlFor="uf">Estado (UF)</label>
              <SelectField
                options={UFOptions}
                value={selectedUF}
                onChange={(selected) => setSelectedUF(selected as Option)}
              />
            </Field>

            <Field>
              <label htmlFor="city">Cidade</label>
              <SelectField
                options={cityOptions}
                value={selectedCity}
                onChange={(selected) => setSelectedCity(selected as Option)}
              />
            </Field>
          </FieldGroup>
        </Fieldset>

        <Fieldset>
          <Legend>
            <h2>Items de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </Legend>

          <ItemsGrid>
            {items.map(item =>
              (
                <Item
                  key={item.id}
                  onClick={()=>handleItemClick(item.id)}
                  selected={selectedItems.includes(item.id)}
                >
                  <img src={item.image_url} alt={item.title}/>
                  <span>{item.title}</span>
                </Item>
              )
            )}
          </ItemsGrid>

        </Fieldset>

        <Button type='submit'>Cadastrar Ponto de Coleta</Button>
      </Form>

      { showModal &&
      <Modal>
        <FiCheckCircle size={48}/>
        <h1>Cadastro Concluído!</h1>
        <Link to='/'> <FiArrowLeft size={32}/> Voltar para home</Link>
      </Modal>
      }

    </Container>
  );
}

export default CreatePoint;
