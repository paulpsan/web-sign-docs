import { QuestionOutlined } from '@ant-design/icons'
import { Image } from 'antd';
import { TitlePage } from '../../../UI/components/TitlePage/TitlePage'
import "./GuiaUser.scss";
import guia_user from "./../../../assets/GuiaUser/WEB USER - GUÍA RÁPIDA - FIRMA DIGITAL - 14-12-2022.pdf";
export const GuiaUser = () => {
    return (
        <>
            <TitlePage
                titleContent="Guia de Usuario Rapido"
                iconComp={<QuestionOutlined />}
            />
            <div className='guia_user_content'>
                <embed
                    src={guia_user}
                    width="1000px"
                    height="700px"
                />
            </div>
        </>
    )
}
