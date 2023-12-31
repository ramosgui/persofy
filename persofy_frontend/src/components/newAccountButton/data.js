import { useState } from 'react';



function NewAccountButtonData() {
    const [modalOpen, setModalOpen] = useState(false);
    return [modalOpen, setModalOpen];
}

export default NewAccountButtonData;
