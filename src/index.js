import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import { StrictMode, Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from "./components/header"
import Footer from "./components/footer"
import Loading from "./components/loading"
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, { logger } from "./components/error"
import axios from "axios"
import './index.css'

const Home = lazy(() => import('./pages/home'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const News = lazy(() => import('./pages/news'));
const Schedule = lazy(() => import('./pages/schedule'));
const Roster = lazy(() => import('./pages/roster'));
const Fundraising = lazy(() => import('./pages/fundraising'));
const Error404 = lazy(() => import('./pages/error404'));

const theme = createTheme({
    palette: {
        primary: {
            main: "#00274C",
        },
        secondary: {
            main: "#F1C400",
        },
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'unset',
            }
        },
    },
});

axios.defaults.baseURL = '/~umpolo'

ReactDOM.render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
            <ThemeProvider theme={theme}>
                <BrowserRouter basename='/~umpolo'>
                    <div className="application">
                        <ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
                            <Header />
                        </ErrorBoundary>
                        <ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
                            <Suspense fallback={<Loading />}>
                                <div className="applicationBody">
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route exact path="/roster" component={Roster} />
                                        <Route exact path="/about" component={About} />
                                        <Route exact path="/fundraising" component={Fundraising} />
                                        <Route exact path="/news" component={News} />
                                        <Route exact path="/schedule" component={Schedule} />
                                        <Route exact path="/contact" component={Contact} />
                                        <Route path="/" component={Error404} />
                                    </Switch>
                                </div>
                            </Suspense>
                        </ErrorBoundary>
                        <ErrorBoundary FallbackComponent={ErrorFallback} onError={logger}>
                            <Footer />
                        </ErrorBoundary>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </ErrorBoundary>
    </StrictMode>,
    document.getElementById("root")
)
