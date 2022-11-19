import ReactDOM from 'react-dom/client';

import { ClientModule } from '@app/module-client';
import { Module } from '@app/module-common';

import App from './App';
import './index.css'

const onAppCreate = async (typeApprovedModules: Module) => {
    const modules = typeApprovedModules as ClientModule

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );

    root.render(<App modules={modules} />);
}

export default new ClientModule({
    onAppCreate: [onAppCreate]
})