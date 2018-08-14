let CatModel

function createCatModel (mongoose) {
  CatModel = mongoose.model('Cat', {
    name: String,
    friends: [String],
    age: Number
  })
}

function inset(val = {}){
  let kitty

  kitty = new CatModel({ name: 'Zildjian', friends: ['tom', 'jerry']})
  kitty.age = 3
  kitty.save((err) => {
    if (err) // ...
      console.log('meow')
  })
}

module.exports = {
  createCatModel, 
  inset
}
