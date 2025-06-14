import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Input from './ui/Input';
import Row from './ui/Row';

const StyledApp = styled.div`
  background-color: red;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type='horizontal'>
            <Heading as='h1'>The Wild Oasis</Heading>
            <div>
              <Heading as='h3'>Checccck</Heading>

              <Input
                type='number'
                placeholder='# Guests'
                id='testnum'
                name='testnum'
              />
              <Button size='small' variation='danger'>
                dsds
              </Button>
            </div>
          </Row>

          <Row type='vertical'>
            <Heading as='h3'>Form</Heading>
            <form>
              <Input
                type='text'
                placeholder='Testing Row'
                id='testtext1'
                name='testtext1'
              />
              <Input
                type='text'
                placeholder='Testing Row'
                id='testtext2'
                name='testtext2'
              />
              <Button size='large' variation='primary'>
                dsds
              </Button>
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
