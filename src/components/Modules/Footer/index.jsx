import Button from '@/components/UI/Button';

const Footer = ({ hasNext = true, onNextClick }) => {
    return (
        <div className='absolute bottom-4 inset-x-0 flex justify-between pb-4 px-2 sm:px-32'>
            <Button isDefault={false} back={true} />
            {hasNext && <Button onClick={onNextClick} isDefault={false} next={true} />}
        </div>
    );
};

export default Footer;