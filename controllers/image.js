const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '3f66999920134030978be8e8a409ebf6'
});
const handleApiCall = (req, res) =>{
  app.models
     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data => res.json(data))
     .catch(err => res.status(400).json('unable to work with API'))

}
const handleImage = (db, bcrypt) => (req, res) => {
  const {id} = req.body;
  db('users').where('id','=',id)
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
    if(entries.length){
      res.json(entries[0]);
    } else {
      res.status(400).json("Can't access entries!")
    }
  })
  .catch(err => res.status(400).json("Fatal Error!"))
}

module.exports = {
  handleImage,
  handleApiCall
}
