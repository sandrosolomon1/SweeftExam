import React, {useCallback, useRef} from "react";

type lastUserRef = (node: any) => void;
type _reactSetState = React.Dispatch<React.SetStateAction<number>>;

/**
 * Custom InfinityScroll Module
 * lastUserRef func observes last rendered HTML_ELEMENT
 */
export default function InfinityScroll(loading:boolean, hasMore: boolean, setPage: _reactSetState): lastUserRef {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastUserRef = useCallback((node) => {
        if(loading) return;

        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            if(entries[0].isIntersecting && hasMore) {
                setPage(prevState => prevState + 1);
            }
        });

        if(node) {
            observer.current.observe(node);
        }
    },[loading,hasMore]);

    return lastUserRef;
}