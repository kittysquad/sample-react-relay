import App from './components/App';
import StarWarsAppHomeRoute from './routes/StarWarsAppHomeRoute';

export default {
    Component: App,
    route: new StarWarsAppHomeRoute({
        factionNames: ['empire', 'rebels']
    }),
};
