import React from "react"
import Iframe from 'react-iframe'

interface Props {
    url: string;
}

export const Video: React.FC<Props> = ({ url }) => {
    return (
        <Iframe url={url}
            width="450px"
            height="450px"
            id="myId"
            className="myClassname"
            position="relative" />
    )
}