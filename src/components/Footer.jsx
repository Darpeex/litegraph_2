import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ p: 1 }} component="footer">
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          <Link color="inherit" href="#" sx={{ textDecoration: 'none' }}>
            Документация
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;

// доработать: отрисовывать снизу + щелкнув по документации может выпадать модальное окно с текстовой информацией по использованию инструмента
