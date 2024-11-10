export default function ShopBanner(props) {
    const { subTitle = '42 Products', title = "Riode Shop", current = "Riode Shop" } = props;

    return (
        <div className="page-header shop" style={{ backgroundImage: `url( ./images/home/page-header.jpg )`, backgroundColor: "#E4EAEA" }}>
            {
                title ? <h1 className="page-title text-dark ls-m font-weight-bold mb-2">{title}</h1> : ''
            }
            {
                subTitle ? <h3 className="page-subtitle text-uppercase text-body">{subTitle}</h3> : ''
            }
        </div>
    )
}