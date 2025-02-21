import { useEffect } from 'react';
import PropTypes from "prop-types";

/**
 * targetValue = {
 *     "x": 0,
 *     "y": 0,
 *     "width": 1430,
 *     "height": 1157,
 *     "top": 0,
 *     "right": 1430,
 *     "bottom": 1157,
 *     "left": 0
 * }
 * @param elementRef - element to track position
 * @param targetValue - value you need to send back in the callback fn
 * @param callback - to update after get the value
 */

const useTrackElementPosition = (elementRef, targetValue, callback) => {

    useEffect(() => {
        const handleScroll = () => {
            if (elementRef.current) {
                // debugger
                const rect = elementRef.current.getBoundingClientRect();
                callback(targetValue === 'all' ?
                    {rect, target: elementRef.current} :
                    {[targetValue]: rect[targetValue], target: elementRef.current}
                );
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Get initial position on mount
        return () => {window.removeEventListener('scroll', handleScroll)};
    }, [callback, elementRef, targetValue]);
};

export default useTrackElementPosition;

useTrackElementPosition.propTypes = {
    elementRef: PropTypes.element.isRequired,
    targetValue: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
}
