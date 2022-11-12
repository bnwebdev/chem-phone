import ReactDOM from 'react-dom/client';
import { BrowserRouter, Switch } from 'react-router-dom';

import { ClientModule } from '@app/module-client';
import { Module } from '@app/module-common';

const onAppCreate = async (typeApprovedModules: Module) => {
    const modules = typeApprovedModules as ClientModule

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );

    root.render(
        <BrowserRouter>
            <Switch>
                {modules.routes}
            </Switch>
        </BrowserRouter>
    );
}

export default new ClientModule({
    onAppCreate: [onAppCreate]
})