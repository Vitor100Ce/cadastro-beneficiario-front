import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { CadastroDependente } from "./pages/cadastro-dependente";
import { CadastroTitular } from "./pages/cadastro-titular";
import { EdicaoDependente } from "./pages/edicao-dependente";
import { EdicaoTitular } from "./pages/edicao-titular";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },

    {
        path: '/cadastro-titular',
        element: <CadastroTitular/>

    },

    {

        path: '/cadastro-dependente',
        element: <CadastroDependente/>

    },

    {

        path: '/edicao-titular',
        element: <EdicaoTitular/>

    },

    {

        path: '/edicao-dependente',
        element: <EdicaoDependente/>

    }
])