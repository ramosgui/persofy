import { useState } from 'react';



function GenericTransactionModalData() {
    const [modalOpen, setModalOpen] = useState(false);
    const [externalInfo, setExternalInfo] = useState({});

    const handleModal = (params) => {
        setExternalInfo(params)
        setModalOpen(true)
    }

    return [modalOpen, setModalOpen, externalInfo, handleModal];
}

export default GenericTransactionModalData;
