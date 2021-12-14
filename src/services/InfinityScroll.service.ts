import React, {useCallback, useRef} from "react";

type _lastUserRef = (node: any) => void;

const PAGE_SIZE_INCREMENT = 10;

export default function InfinityScroll(loading:boolean, hasMore: boolean, setPageSize: React.Dispatch<React.SetStateAction<number>>): _lastUserRef {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastUserRef = useCallback((node) => {
        // eslint-disable-next-line no-useless-return
        if(loading) return;

        /** update last observed node */
        if(observer.current) observer.current.disconnect();

        /** if last rendered node is visible on page update the state */
        observer.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            if(entries[0].isIntersecting && hasMore) {
                setPageSize(prevState => prevState + PAGE_SIZE_INCREMENT);
            }
        });

        if(node) {
            observer.current.observe(node);
        }
    },[loading,hasMore]);

    return lastUserRef;
}