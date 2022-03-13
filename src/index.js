require('dotenv').config();
const pdf = require('pdf-parse');
const fs = require('fs');
const { login } = require('./functions');

login();
