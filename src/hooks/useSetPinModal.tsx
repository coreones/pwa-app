import { useState } from "react";

export const useSetPinModal = () => {
    const [show, setShow] = useState(false);
    const open = () => setShow(true);
    const close = () => setShow(false);

    return { show, open, close };
};
