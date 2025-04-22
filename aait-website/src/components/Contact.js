import React, { useState, useCallback, memo } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Card,
  CardContent,
  styled,
  InputLabel,
  Snackbar,
  Alert
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';

// Memoized styled components
const ContactCard = memo(styled(Card)(({ theme }) => ({
  height: '100%',
  background: '#ffffff',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
})));

const ContactInfoItem = memo(styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  padding: theme.spacing(4),
  transition: 'all 0.4s ease',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(46, 31, 71, 0.03) 0%, rgba(46, 31, 71, 0.08) 100%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    zIndex: -1,
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    '&::before': {
      opacity: 1,
    },
    '& .icon-wrapper': {
      background: 'linear-gradient(135deg, #2E1F47 0%, #443365 100%)',
      color: '#ffffff',
      transform: 'scale(1.1) rotate(10deg)',
    },
    '& .contact-text': {
      color: '#2E1F47',
    },
    '& .contact-title': {
      color: '#2E1F47',
    }
  },
})));

const IconWrapper = memo(styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(46, 31, 71, 0.05)',
  color: '#2E1F47',
  transition: 'all 0.3s ease',
})));

const StyledInputLabel = memo(styled(InputLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: '#000',
  fontWeight: 500,
  '& .required': {
    color: '#E91E63',
    marginLeft: '4px',
  },
})));

// Memoize the products array
const products = [
  'WhatsApp Marketing',
  'Lead Generation',
  'CRM System',
];

// Memoized ContactInfo component
const ContactInfo = memo(({ icon: Icon, title, text }) => (
  <ContactInfoItem>
    <IconWrapper className="icon-wrapper">
      <Icon fontSize="large" />
    </IconWrapper>
    <Box>
      <Typography variant="h6" className="contact-title" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" className="contact-text">
        {text}
      </Typography>
    </Box>
  </ContactInfoItem>
));

const Contact = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    product: '',
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!recaptchaValue) {
      setSnackbar({ open: true, message: 'Please complete the reCAPTCHA', severity: 'error' });
      return;
    }

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        { ...formData, 'g-recaptcha-response': recaptchaValue },
        'YOUR_PUBLIC_KEY'
      );
      setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
      setFormData({ name: '', email: '', whatsapp: '', product: '' });
      setRecaptchaValue(null);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to send message. Please try again.', severity: 'error' });
    }
  }, [formData, recaptchaValue]);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  return (
    <Box component="section" id="contact" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" component="h2" gutterBottom>
            Contact our Sales Team!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            If you have inquiry about the product feel free to contact.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, sm: 5, md: 6 }}>
          <Grid xs={12} md={6}>
            <ContactCard>
              <CardContent>
                <form onSubmit={handleSubmit} style={{ height: '100%' }}>
                  <Grid container spacing={{ xs: 2, sm: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        name="name"
                        label="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name :"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        name="email"
                        type="email"
                        label="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email :"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        name="whatsapp"
                        label="WhatsApp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="WhatsApp :"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        select
                        name="product"
                        label="Interested Product"
                        value={formData.product}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                      >
                        {products.map((product) => (
                          <MenuItem key={product} value={product}>
                            {product}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <ReCAPTCHA
                        sitekey="YOUR_RECAPTCHA_SITE_KEY"
                        onChange={setRecaptchaValue}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </ContactCard>
          </Grid>

          <Grid xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <ContactInfo
                icon={LocationOnIcon}
                title="Our Location"
                text="API TOWER SHEIKH ZAID ROAD TRADE CENTRE,DUBAI,UAE"
              />
              <ContactInfo
                icon={EmailIcon}
                title="Email Us"
                text="info@aaitsolu.com"
              />
              <ContactInfo
                icon={PhoneIcon}
                title="Call Us"
                text="+(971) 052 875 0537"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default Contact;