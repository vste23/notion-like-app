import './App.css';
import {Container} from "@material-ui/core";
import CardBlock from '../components/card/CardBlock';

const App = () => {
    return (
        <Container maxWidth="md" className={'container'}>
            <CardBlock/>
        </Container>
    );
}

export default App;
