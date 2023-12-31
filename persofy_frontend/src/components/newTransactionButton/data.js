import { useState } from 'react';



function NewTransactionButtonData() {
    const [modalOpen, setModalOpen] = useState(false);
    return [modalOpen, setModalOpen];
}

export default NewTransactionButtonData;
