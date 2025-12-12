import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import Typography from '@mui/material/Typography';

export default function Contact() {

    const items = [
        {
            icon: <EmailIcon sx={{fontSize: 34}}/>,
            label: "herVitalityCare@gmail.com",
            onClick: () => window.location.href = "mailto:priya.chauhan117317@marwadiuniversity.ac.in"
        },
        {
            icon: <CallIcon sx={{fontSize: 34}}/>,
            label: "+91 (0281) 123-4567",
            onClick: () => window.location.href = "tel:+919408643001"
        },
        {
            icon: <LocationPinIcon sx={{fontSize: 34}}/>,
            label: "123 Wellness St, Healthy City, HC 45678",
            onClick: () => window.open("https://www.google.com/maps", "_blank")
        }
    ]

  return (
    <Box component="section" sx={{ px: 2, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 4, pb: 16 }}>
    <Typography variant="h4" sx={{ mb: 4, color: 'rgba(227,4,110,1)', fontWeight: 700 }} data-aos="zoom-out-up">
      Get in Touch with Us
    </Typography>
    <Stack
    direction={{ xs: 'column', sm: 'row' }}
    spacing={{ xs: 1, sm: 2, md: 5 }}>
    {items.map((item, index) => (
    <Box
    key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 3, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: 2, width: '12rem', cursor: 'pointer', transition: 'transform 0.3s' }}>
    <Box sx={{color: '#A41F39', width: 'fit-content', backgroundColor: 'rgba(246, 218, 226, 0.8)', p: 3, borderRadius: '50%', ":hover": { transform: 'scale(1.1)', boxShadow: '0 0 12px rgba(0, 0, 0, 0.2)'}}} onClick={item.onClick}>{item.icon} </Box> 
    <Box sx={{mt: 5, alignItems: 'center', textAlign: 'center', fontSize: 16, cursor: 'pointer', ":hover": { textDecoration: 'underline', transform: 'scale(1.05)', color: 'rgba(227,4,110,0.7)'}}} onClick={item.onClick}>{item.label}</Box>
    </Box>
    ))}
    </Stack>
    </Box>
  );
}