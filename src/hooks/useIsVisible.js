import { useEffect, useState } from 'react'

const useIsVisible = (ref) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        });
        if (ref.current) {
            observer.observe(ref.current);
        };

        return () => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        }

    }, [ref])

    return isIntersecting;
}

export default useIsVisible