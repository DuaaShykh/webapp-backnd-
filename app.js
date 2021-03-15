const express = require('express');

const app = express();

const VCRegistrationRoutes = require('./routes/VCRegistrationApi')
const VFRegistrationRoutes = require('./routes/VFRegistrationApi')
const patientRegistrationRoutes = require('./routes/patientRegistrationApi')
const doctorRegistrationRoutes = require('./routes/doctorRegistrationApi')
const vaccineRoutes = require('./routes/vaccineApi')
const verificationRoutes = require('./routes/verificationApi')
const verifierRoutes = require('./routes/verifierApi')
const vaccinationRoutes = require('./routes/vaccinationApi')
const adminRoutes = require('./routes/adminApi')

app.use('/VCRegistration', VCRegistrationRoutes );
app.use('/VFRegistration', VFRegistrationRoutes );
app.use('/patientRegistration', patientRegistrationRoutes );
app.use('/doctorRegistration', doctorRegistrationRoutes );
app.use('/vaccine', vaccineRoutes );
app.use('/verification', verificationRoutes );
app.use('/verifier', verifierRoutes );
app.use('/vaccination', vaccinationRoutes );
app.use('/admin', adminRoutes );


module.exports = app;