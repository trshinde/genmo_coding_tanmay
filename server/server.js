const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let patientDetails = [
    {
      First: "Tanmay",
      Last: "Shinde",
      DOB: "04/15/1994",
      Email: "tanmay1@hotmail.com",
      phoneNo: "+1-111-123-4567",
    },
    {
      First: "Nishank",
      Last : "Shinde",
      DOB: "06/04/1990",
      Email: "nishank65@hotmail.com",
      phoneNo: "+1-234-090-8721",
    },
    {
      First: "Archika",
      Last: "Singh",
      DOB: "10/08/1994",
      Email: "archu94@hotmail.com",
      phoneNo: "+1-891-010-1673",
    },
    {
      First: "KL",
      Last: "Rahul",
      DOB: "04/18/1992",
      Email: "rahulkl92@hotmail.com",
      phoneNo: "+1-519-990-2277",
    }
];

app.get('/api/patientDetails', (req,res) => {
	res.send(patientDetails);
})

app.listen(port, () => {
	console.log('Server is running');
})