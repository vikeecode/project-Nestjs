import Header from "../../../components/AuthFormCompent/Header";
import LoginFrom from "../../../components/AuthFormCompent/loginFrom";
import AnimatedAuthCard from "../../../components/ui/cardAnimation/CardAnimation";

function forget () {
    return (
        <AnimatedAuthCard>
            <Header 
                heading="FORGET PASSWORD"
                paragraph="You can change a password here"
                linkName="login"
                linkUrl="/login"

                />
        </AnimatedAuthCard>
    )
}

export default forget;