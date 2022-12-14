import React from 'react'
import "./TitlePage.scss"
interface PropsTitlePage {
    titleContent: string,
    iconComp: React.ReactElement
}
export const TitlePage: React.FunctionComponent<PropsTitlePage> = (prosp: PropsTitlePage) => {
    const { titleContent = "prop type", iconComp } = prosp;
    return (
        <div className="title-content">
            <div className='title-item'>
                <span>{titleContent}</span>
            </div>
            <div className='icon-item'>
                {iconComp}
            </div>
        </div>
    )
}
