export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name:"name",
      type:"string",
      title:"Restaurant Name",
      validation:(Rule)=>Rule.required(),
    },
    {
      name:"short_description",
      type:"string",
      title:"Short Description",
      validation:(Rule)=>Rule.max(200),
    },
    {
      name:"image",
      type:"image",
      title:"Image of the Restaurant",
      
    },
    {
      name:"lat",
      type:"number",
      title:"latitude of the Restaurant",
      
    },
    {
      name:"long",
      type:"number",
      title:"longitude of the Restaurant",
      
    },
    {
      name:"address",
      type:"string",
      title:"Address of the Restaurant",
      validation:(Rule)=>Rule.required(),
      },
      {
        name:"rating",
        type:"number",
        title:"Enter a Rating from 1-5",
        validation:(Rule)=>Rule.required()
        .min(1)
        .max(5)
        .error("Please enter a value between 1-5"),
        },
      {
        name:"type",
        type:"string",
        title:"Category",
        validation:(Rule)=>Rule.required(),
        type:"reference",
        to:[{type:"category"}],
       },
       {
        name:"dishes",
        type:"array",
        title:"Dishes",
        of:[{type:"reference", to:[{type:"dish"}]}],
        
      },
  ],

 
}
