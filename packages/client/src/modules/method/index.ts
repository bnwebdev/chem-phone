import { ClientModule } from "@app/module-client";

import source from './locale'
import photoAnalysis from "./photo-analysis";

export default new ClientModule(
    {
        localization: [{ namespace: 'methods', source }],
        leftNavItem: [
            {
                label: 'methods:labels.root',
                auth: true,
                children: [
                    {
                        label: 'methods:labels.photoAnalysis',
                        link: '/methods/photo-analysis'
                    }
                ]
            }
        ]
    }, 
    photoAnalysis
)