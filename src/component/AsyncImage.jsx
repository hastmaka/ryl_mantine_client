import PropTypes from 'prop-types'
import {Image, Loader} from '@mantine/core'
import {useState} from "react";

export default function AsyncImage({url, altImg, loaderProps, ...rest}) {
    const [imgLoading, setImgLoading] = useState(true)
    const [imgError, setImgError] = useState(false)
    return (
        <>
            <Loader
                bg='#00000040'
                style={{
                    display: imgLoading ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                {...loaderProps}
            />
            <Image
                src={imgError ? altImg : url}
                decoding="async"
                onLoad={() => setImgLoading(false)}
                onError={() => setImgError(true)}
                style={{
                    display: imgLoading ? 'none' : 'block'
                }}
                {...rest}
            />
        </>
    );
}

AsyncImage.propTypes = {
    url: PropTypes.string.isRequired,
    altImg: PropTypes.string,
    loaderProps: PropTypes.object
}