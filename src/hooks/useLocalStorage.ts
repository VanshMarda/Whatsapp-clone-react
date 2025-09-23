//libs
import { useCallback } from "react";

//types
import { Connection } from "../constant/connections";

export const useLocalStorage = () => {

    const handleEditMessageInLocalStorage = useCallback((key: number,message:string,id:string|undefined) => {
        if (!id) return;
        const chatSelected : Connection = JSON.parse(localStorage.getItem(id)!);
            localStorage.setItem(
              id,
              JSON.stringify({
                ...chatSelected,
                messages: chatSelected.messages.map((mess, index) => {
                  if (index === key) {
                    return {
                      id: `message_id_${Date.now()}`,
                      message,
                      time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    };
                  }
                  return mess;
                }),
              })
            );
    }, [])

    const handleDeleteMessageInLocalStorage = useCallback((key: number,id:string|undefined) => {
        if (!id) return;
        const chatSelected : Connection = JSON.parse(localStorage.getItem(id)!);
        localStorage.setItem(id, JSON.stringify({
            ...chatSelected,
            messages: chatSelected.messages.filter((_, index) => index !== key),
        }));
    }, [])

    const handleNewMessageInLocalStorage = useCallback((message:string,id:string|undefined) => {
        if (!id) return;
        const chatSelected : Connection = JSON.parse(localStorage.getItem(id)!);
        localStorage.setItem(id, JSON.stringify({
            ...chatSelected,
            messages: [...chatSelected.messages, {
                id: `message_id_${Date.now()}`,
                message,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            }],
        }));
    }, [])

    const setLocalStorage = useCallback((id:string,connection:Connection) => {
        localStorage.setItem(id, JSON.stringify(connection));
    }, [])

    const removeLocalStorage = useCallback((id:string) => {
        localStorage.removeItem(id);
    }, [])

  return {
    handleEditMessageInLocalStorage,
    handleDeleteMessageInLocalStorage,
    handleNewMessageInLocalStorage,
    setLocalStorage,
    removeLocalStorage,
  }
};