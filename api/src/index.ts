import app from './app';


const port = process.env.EXPRESS_PORT;

app.listen(port, () =>{
    console.log('listening to ', port);

});
