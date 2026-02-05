import {createContext, type ReactNode, useContext, useState} from 'react';
import {NodeType} from "../../../domain";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DnDContext = createContext([null, (_type: NodeType) => {}]);

export const DnDProvider = ({ children }: { children: ReactNode }) => {
    const [type, setType] = useState(null);

    return (
        <DnDContext.Provider value={[type, setType]}>
            {children}
        </DnDContext.Provider>
    );
}

export default DnDContext;

// eslint-disable-next-line react-refresh/only-export-components
export const useDnD = () => {
    return useContext(DnDContext);
}