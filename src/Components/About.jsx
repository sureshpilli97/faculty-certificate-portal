import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import '../Styles/AboutStyle.css';
import GlobalTheme from '../Themes/GlobalTheme';

const advisers = [
  {
    name: "Dr. Loshma Gunisetti",
    designation: "Professor and HOD, CAI&AIM",
    img: ""
  },
  {
    name: "Dr. Shirin Bhanu Koduri",
    designation: "Associate Professor",
    img: ""
  }
];

const developers = [
  {
    name: "Suresh Pilli",
    designation: "Student",
    img: ""
  },
];

const About = () => {
  return (
    <div className="section" style={{ fontFamily: GlobalTheme.fontFamily }}>
      <h3>About</h3>
      <div className="about-container">
        <div className="section">
          <Typography variant="h5" component="div">
            Faculty Advisers
          </Typography>
          <div className="advisers">
            {advisers.map((i, index) => (
              <Card key={index} sx={{ minWidth: 300, margin: 2 }}>
                <CardContent className="card">
                  <Typography variant="h5" component="div">
                    {i.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {i.designation}
                  </Typography>
                  <div className='imge'>
                    <Avatar style={{ width: 150, height: 150 }} src={i.img} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="section">
          <Typography variant="h5" component="div">
            Developers
          </Typography>
          <div className="developers">
            {developers.map((i, index) => (
              <Card key={index} sx={{ minWidth: 300, marginTop: 2 }}>
                <CardContent className="card">
                  <Typography variant="h5" component="div">
                    {i.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {i.designation}
                  </Typography>
                  <div className='imge'>
                    <Avatar style={{ width: 150, height: 150 }} src={i.img} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
