import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFoundPage = () => {
    const navigate = useNavigate()
    const handleHomeClick = () => {
        navigate("/")
    }
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button onClick={handleHomeClick} type="primary">Back Home</Button>}
        />
    );
}

export default NotFoundPage;