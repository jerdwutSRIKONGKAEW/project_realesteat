import Cards from '../Cards';

const OurService = () => {

    const OurServiceList = () => {
        return <div>
            <div className="home-title">
                บริการของเรา
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Cards src="/image/imageTest.jpg">
                    <div>1231231</div>
                    <div>12132132</div>
                </Cards>
            </div>
        </div>
    }

    return(
        <div>
            <OurServiceList  />
        </div>
    )
}

export default OurService;