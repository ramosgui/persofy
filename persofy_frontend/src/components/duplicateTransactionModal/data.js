import { useState } from 'react';



function DuplicateTransactionsModalData() {
    const [modalOpen, setModalOpen] = useState(false);
    return [modalOpen, setModalOpen];
}

export default DuplicateTransactionsModalData;
