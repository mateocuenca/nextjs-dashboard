import {useState} from 'react';
import {ChevronRight} from 'lucide-react';

import {TabsContainer, Tab, CardProceso} from "./StyledComponents.jsx"


export default function Proceso(props) {

    // Estados y variables iniciales
    const [tabValue, setTabValue] = useState(0);

    // Handlers
    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };


    return (
        <div style={{overflowY: 'scroll'}}>
            <div style={{margin: '20px 0'}}>
                <span>{props.candidateName}</span>
                <ChevronRight/>
                <span>Analista de QA</span>
            </div>

            <TabsContainer>
                <Tab active={tabValue === 0} onClick={() => handleTabChange(0)}>Detalles</Tab>
            </TabsContainer>

            {tabValue === 0 && (
                <div>
                    <CardProceso>
                        <h6>Información Personal</h6>
                        <p>Nombre: {props.currentCandidate.candidateName}</p>
                        <p>Email: {props.currentCandidate.email}</p>
                        <p>Teléfono: {props.currentCandidate.phone}</p>
                    </CardProceso>

                    <CardProceso>
                        <h6>Análisis de CV con IA</h6>
                        <p>{props.currentCandidate.analysys}</p>
                    </CardProceso>
                </div>
            )}

        </div>
    );
}
