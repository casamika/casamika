const fs = require('fs');
const path = require('path');

const menuData = JSON.parse(fs.readFileSync(path.join(__dirname, 'image', 'menu-items', 'menu-data.json'), 'utf8'));

// Take top 4 from each category for homepage showcase
const showcaseItems = [
  ...menuData.food.slice(0, 4).map(i => ({ ...i, cat: 'food', badgeVi: 'Ẩm thực', badgeEn: 'Culinary', badgeDe: 'Küche', badgeKo: '요리', img: `/image/menu-items/food/${i.dest}` })),
  ...menuData.drink.slice(0, 4).map(i => ({ ...i, cat: 'drink', badgeVi: 'Đồ uống', badgeEn: 'Drink', badgeDe: 'Getränke', badgeKo: '음료', img: `/image/menu-items/drink/${i.dest}` })),
  ...menuData.mocktail.slice(0, 4).map(i => ({ ...i, cat: 'mocktail', badgeVi: 'Mocktail', badgeEn: 'Mocktail', badgeDe: 'Mocktail', badgeKo: '목테일', img: `/image/menu-items/mocktail/${i.dest}` }))
];

const GOOGLE_RESERVE_URL = 'https://www.google.com/maps/reserve/v/dine/c/tx1PNeAwXj8?source=pa&opi=79508299&hl=vi&gei=xsq8ap2nGfek2roPv8oj&ahbb=1&sourceurl=https://www.google.com/maps/preview/place?authuser%3D0%26hl%3Dvi%26pb%3D!1m14!1s0x31421737deda4ad1:0xf6fb5ca72c7d33f!3m12!1m3!1d26061.27722053428!2d108.24709075!3d16.0497664!2m3!1f0!2f0!3f0!3m2!1i2560!2i1305!4f13.1!12m4!2m3!1i360!2i120!4i8!13m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!14m5!1swsq8aszpL_7d2roPy8Od-As:49!2s1i:0,t:150714,p:wsq8aszpL_7d2roPy8Od-As:49!7e81!12e3!17swsq8aszpL_7d2roPy8Od-As:53!15m108!1m28!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m17!3b1!4b1!5b1!6b1!9b1!13b1!14b1!17b1!20b1!21b1!22b1!30b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b1!21m28!1m6!1m2!1i0!2i0!2m2!1i530!2i1305!1m6!1m2!1i2510!2i0!2m2!1i2560!2i1305!1m6!1m2!1i0!2i0!2m2!1i2560!2i20!1m6!1m2!1i0!2i1285!2m2!1i2560!2i1305!22m1!1e81!29m0!30m6!3b1!6m1!2b1!7m1!2b1!9b1!34m5!7b1!10b1!14b1!15m1!1b0!37i797!39zQ2FzYSBNaWthIOKAkyBDb2ZmZWUgJiBSZXN0YXVyYW50IOKAkyBXb3Jrc3BhY2UsIMSQxrDhu51uZyBUcuG6p24gQuG6oWNoIMSQ4bqxbmcsIEFuIEjhuqNpLCBOZ8WpIEjDoG5oIFPGoW4sIMSQw6AgTuG6tW5n%26q%3DCasa%2BMika%2B%25E2%2580%2593%2BCoffee%2B%2526%2BRestaurant%2B%25E2%2580%2593%2BWorkspace,%2B%25C4%2590%25C6%25B0%25E1%25BB%259Dng%2BTr%25E1%25BA%25A7n%2BB%25E1%25BA%25A1ch%2B%25C4%2590%25E1%25BA%25B1ng,%2BAn%2BH%25E1%25BA%25A3i,%2BNg%25C5%25A9%2BH%25C3%25A0nh%2BS%25C6%25A1n,%2B%25C4%2590%25C3%25A0%2BN%25E1%25BA%25B5ng';

function getGoogleReserveUrl(lang) {
  const hl = lang === 'vi' ? 'vi' : lang === 'de' ? 'de' : lang === 'ko' ? 'ko' : 'en';
  return GOOGLE_RESERVE_URL.replace(/hl=vi/g, `hl=${hl}`).replace(/hl%3Dvi/g, `hl%3D${hl}`);
}

function buildHomepage(lang) {
  const reserveUrl = getGoogleReserveUrl(lang);
  const t = {
    vi: {
      lang: 'vi',
      title: 'Casa Mika — Garden Dining, Fine Wine & Acoustic Lounge | Mỹ Khê, Đà Nẵng',
      metaDesc: 'Trải nghiệm ẩm thực sân vườn 1.400m² bên bờ biển Mỹ Khê, Đà Nẵng. Ẩm thực Á - Âu đương đại, hầm vang tuyển chọn cùng giai điệu Piano & Guitar mộc mạc mỗi đêm.',
      navAbout: 'Về Chúng Tôi',
      navMenu: 'Thực Đơn',
      navNews: 'Tin Tức',
      navCareer: 'Tuyển Dụng',
      navReserve: 'Đặt Bàn',
      heroEyebrow: '— Casa Mika Đà Nẵng',
      heroTitle: 'Chốn dừng chân xanh mát<br>bên biển Mỹ Khê,<br><em>nơi thời gian nhường chỗ<br>cho xúc cảm.</em>',
      heroSub: 'Không gian ẩm thực sân vườn 1.400m² chan hòa bóng mát — nơi hội ngộ của phong vị Á – Âu đương đại, bộ sưu tập vang tuyển chọn và giai điệu mộc mạc mỗi hoàng hôn.',
      heroBtnReserve: 'Đặt Bàn Ngay',
      heroBtnMenu: 'Xem Thực Đơn',
      storyEyebrow: '— Câu Chuyện Thương Hiệu',
      storyTitle: 'Một mái nhà chung,<br><em>giữa khu vườn nhiệt đới.</em>',
      storyLede: 'Casa Mika khởi nguồn từ tình yêu với biển Mỹ Khê và niềm đam mê ẩm thực của nhà sáng lập Nguyễn Thị Minh Khánh. Cô ấp ủ tạo dựng một "ngôi nhà" đúng nghĩa — nơi bạn bè, gia đình và những người sành sỏi có thể ngồi lại bên nhau, thưởng thức món ngon và tận hưởng trọn vẹn từng khoảnh khắc gặp gỡ.',
      storyBody1: 'Tọa lạc tại số 37 Trần Bạch Đằng, chỉ cách bãi biển Mỹ Khê vài bước chân, Casa Mika trải rộng trên khuôn viên 1.400m² ngập tràn mảng xanh. Không gian được bài trí tinh tế: ngôi nhà kính trong suốt đón trọn ánh sáng tự nhiên, khoảng sân vườn rợp bóng cây, quầy bar hiện đại đối diện tháp vang kịch trần, cùng chiếc đại dương cầm (grand piano) đặt trang trọng tại sảnh tiệc. Từng góc nhỏ đều hướng tới một trải nghiệm ẩm thực thư thái, biệt lập và giàu tính nghệ thuật.',
      storyBody2: 'Trong tiếng Tây Ban Nha, <em>Casa</em> có nghĩa là ngôi nhà. Còn <em>Mika</em> là tên gọi thân thương mà bạn bè quốc tế và tri kỷ vẫn dành cho Minh Khánh. Casa Mika — Ngôi nhà của Mika — luôn rộng mở đón bạn ghé thăm, như trở về chốn hẹn quen thuộc sau những ồn ào của nhịp sống phố thị.',
      metaStat1Title: 'Điểm hẹn Mỹ Khê', metaStat1Sub: '37 Trần Bạch Đằng, Đà Nẵng',
      metaStat2Title: '1.400m² Không gian', metaStat2Sub: 'Vườn nhiệt đới, nhà kính, quầy bar & sảnh tiệc',
      metaStat3Title: 'Đón tiếp mỗi ngày', metaStat3Sub: 'Mở cửa từ 07:30 sáng – 00:00 đêm',
      quote1: 'Chúng tôi không chỉ phục vụ những món ăn.<br>Chúng tôi chuẩn bị một không gian trọn vẹn<br><em>để nâng niu từng cuộc hội ngộ.</em>',
      quote2: 'Rời xa nhịp sống vội vã bên ngoài.<br>Tại Casa Mika, câu chuyện thêm dài<br><em>và niềm vui được trọn vẹn hơn.</em>',
      reelsEyebrow: '— Khoảnh Khắc Casa Mika',
      reelsTitle: 'Nhịp thở khu vườn,<br><em>qua từng khung hình.</em>',
      reelsSub: 'Hai góc nhìn chân thực, sống động định dạng 9:16 ghi lại vẻ đẹp không gian và tinh hoa ẩm thực tại Casa Mika.',
      reelsBadge1: 'Khu Vườn & Không Gian',
      reelsBadge2: 'Ẩm Thực & Phong Cách Sống',
      valuesEyebrow: '— Giá Trị Cốt Lõi',
      valuesTitle: 'Bốn tôn chỉ ẩm thực<br><em>chúng tôi luôn gìn giữ.</em>',
      valuesSub: 'Mỗi món ăn hay ly thức uống tại Casa Mika đều là kết tinh của sự tận tâm, chuẩn mực khắt khe và niềm đam mê dành cho nghệ thuật ẩm thực.',
      v1Num: '01 / Nhịp điệu', v1Title: 'Thưởng thức thong dong, <em>không vội vã.</em>', v1Desc: 'Mỗi món ăn và ly rượu được phục vụ nhịp nhàng theo cuộc trò chuyện của bạn. Chúng tôi luôn trân trọng từng phút giây thực khách thong thả sẻ chia và gắn kết bên nhau.',
      v2Num: '02 / Nguyên liệu', v2Title: 'Tươi ngon từ nguồn cội, <em>mùa nào thức nấy.</em>', v2Desc: 'Từ hải sản tươi sống đánh bắt trong ngày tại vùng biển Đà Nẵng đến các loại thảo mộc hữu cơ thanh lành, nguyên liệu chất lượng chính là linh hồn làm nên vị ngon tự nhiên.',
      v3Num: '03 / Gian bếp', v3Title: 'Giao thoa Á – Âu, <em>phong vị đương đại.</em>', v3Desc: 'Đội ngũ đầu bếp khéo léo kết hợp kỹ thuật chế biến phương Tây chuẩn mực với chiều sâu đậm đà của gia vị Việt, tạo nên trải nghiệm ẩm thực vừa mới mẻ vừa thân thuộc.',
      v4Num: '04 / Bàn tay', v4Title: 'Tâm huyết thủ công, <em>tỉ mỉ từng chi tiết.</em>', v4Desc: 'Từ kỹ thuật lắc shaker điêu luyện của bartender, hương thơm đĩa nướng tổng hợp xèo xèo trên lửa, đến từng cọng ngò nhánh hoa trang trí — mọi chi tiết đều được chăm chút bằng sự tận tụy của người làm nghề.',
      dayEyebrow: '— Nhịp Sống Tại Casa Mika',
      dayTitle: 'Từng khoảnh khắc trong ngày,<br><em>một phong vị riêng.</em>',
      daySub: 'Từ ánh ban mai len qua vòm lá đến ánh đèn ấm áp lúc đêm về, Casa Mika luôn có một góc êm đềm dành riêng cho bạn.',
      dayMornName: 'Sáng', dayMornDesc: 'Nắng sớm xuyên qua tán lá, khởi đầu ngày mới với tách cà phê thơm đượm, tô Phở Bò Thượng Hạng nóng hổi hay set Bữa Sáng Casa Mika đầy năng lượng.',
      dayNoonName: 'Trưa', dayNoonDesc: 'Tận hưởng bữa trưa mát rượi trong nhà kính hay dưới bóng cây, thưởng thức Bò Lúc Lắc đậm đà, Gỏi Ngó Sen Hải Sản giòn tươi thanh mát cùng đối tác và người thương.',
      dayAftName: 'Chiều', dayAftDesc: 'Khoảng lặng thư thái đọc sách hay trò chuyện thân mật. Thưởng thức ly mocktail Sunset Over My Khe mát lạnh khi gió biển bắt đầu thổi tràn qua hiên.',
      dayEveName: 'Tối', dayEveDesc: 'Không gian bừng sáng dưới ánh nến lung linh. Thưởng thức Đĩa Nướng Tổng Hợp thơm lừng, Tôm Hùm Sốt Trứng Muối cùng ly vang nồng nàn bên tiếng đàn Piano và Guitar du dương.',
      showcaseEyebrow: '— Tuyển Chọn Ẩm Thực',
      showcaseTitle: 'Hương vị tinh hoa,<br><em>chắt lọc cho bàn tiệc của bạn.</em>',
      showcaseSub: 'Từ nguồn hải sản tươi ngon buổi sớm đến những ly cocktail và mocktail sáng tạo dưới ánh hoàng hôn.',
      tabAll: 'Món Nổi Bật', tabFood: 'Ẩm Thực', tabDrink: 'Cà Phê & Đồ Uống', tabMocktail: 'Mocktail & Cocktail',
      viewFullMenuBtn: 'Xem Toàn Bộ Thực Đơn Chi Tiết',
      atmosEyebrow: '— Không Gian & Trải Nghiệm',
      atmosTitle: 'Hai dấu ấn đặc trưng<br><em>lắng đọng nơi sảnh chính.</em>',
      atmosSub: 'Không gian sang trọng được thiết kế hài hòa, mang lại cảm giác thư thái và trọn vẹn cho mọi giác quan.',
      atmosCard1Tag: 'Tại sảnh chính',
      atmosCard1Title: 'Tháp Vang Kịch Trần & Quầy Bar Hiện Đại',
      atmosCard1Desc: 'Tủ rượu kính viền kim loại cao kịch trần chạy dọc sảnh tiệc, lưu giữ hàng trăm chai vang danh tiếng từ khắp nơi trên thế giới. Quầy bar trung tâm là nơi bartender sáng tạo nên những ly cocktail và mocktail mang dấu ấn biển Mỹ Khê rực rỡ.',
      atmosCard2Tag: 'Từ sảnh đón & quầy bar',
      atmosCard2Title: 'Mỗi Tối, Dương Cầm & Acoustic Guitar',
      atmosCard2Desc: 'Mỗi đêm từ 19:00, tiếng đại dương cầm hòa cùng giai điệu acoustic guitar mộc mạc bên quầy bar — được cất lên để điểm xuyết không gian, nâng niu từng cuộc trò chuyện thân mật bên bàn tiệc.',
      eventsEyebrow: '— Tiệc Riêng & Sự Kiện',
      eventsTitle: 'Khuôn viên 1.400m² lý tưởng<br><em>cho những sự kiện đáng nhớ của bạn.</em>',
      eventsDesc: 'Từ tiệc cưới lãng mạn ngoài trời, sinh nhật sum vầy, đến tiệc tối chiêu đãi đối tác và ra mắt thương hiệu. Nhà kính tinh tế 60 khách, khu hiên vườn 120 khách và toàn bộ khuôn viên lên đến 300 khách. Thực đơn thiết kế riêng, tư vấn chọn vang chuyên nghiệp và dịch vụ chu đáo kín đáo.',
      eventsZalo: 'Lên Kế Hoạch Qua Zalo',
      eventsTel: 'hoặc gọi +84 708 888 007',
      visitEyebrow: '— Đặt Chỗ & Ghé Thăm',
      visitTitle: 'Cánh cửa luôn rộng mở.<br><em>Ghé thăm cho một bữa ngon, ở lại cho một buổi tối trọn vẹn.</em>',
      visitSub: 'Ốc đảo ẩm thực sân vườn tại 37 Trần Bạch Đằng, khu phố biển Mỹ Khê, Đà Nẵng. Mở cửa hàng ngày từ 07:30 sáng đến 00:00 đêm.',
      btnReserve: 'Đặt Bàn',
      btnZalo: 'Nhắn Tin Zalo',
      btnFacebook: 'Ghé Thăm Facebook',
      footerBrand: 'Tổ hợp ẩm thực sân vườn & acoustic lounge bên biển Mỹ Khê.',
      footerVisit: 'Đến với chúng tôi',
      footerContact: 'Liên hệ',
      footerFollow: 'Theo dõi'
    },
    en: {
      lang: 'en',
      title: 'Casa Mika — Garden Dining, Fine Wine & Acoustic Lounge | Da Nang',
      metaDesc: 'Experience 1,400m² garden dining by My Khe Beach, Da Nang. Contemporary East-meets-West cuisine, curated wine collection, and live Grand Piano & Guitar every evening.',
      navAbout: 'About Us',
      navMenu: 'Menu',
      navNews: 'News',
      navCareer: 'Career',
      navReserve: 'Reserve',
      heroEyebrow: '— Casa Mika Da Nang',
      heroTitle: 'A green sanctuary<br>by My Khe Beach,<br><em>where time yields<br>to emotion.</em>',
      heroSub: 'An expansive 1,400m² garden dining estate in Da Nang — bringing together contemporary East-meets-West flavours, a curated wine collection, and acoustic melodies at dusk.',
      heroBtnReserve: 'Reserve a Table',
      heroBtnMenu: 'Explore Menu',
      storyEyebrow: '— Our Story',
      storyTitle: 'A welcoming home,<br><em>nested in a tropical garden.</em>',
      storyLede: 'Casa Mika was born from a deep affection for My Khe Beach and a lifelong passion for culinary arts by founder Nguyễn Thị Minh Khánh. She envisioned a true home — an inviting haven where friends, families, and discerning travellers gather around honest flavours and unforgettable conversations.',
      storyBody1: 'Located at 37 Tran Bach Dang, just a short stroll from the golden sands of My Khe, Casa Mika spans an expansive 1,400m² green haven. Every corner is thoughtfully curated: a sunlit glasshouse, a breezy garden terrace, a contemporary bar facing a soaring floor-to-ceiling wine wall, and an elegant Grand Piano gracing the main hall. Everything is designed for a relaxed, refined, and soulful dining experience.',
      storyBody2: 'In Spanish, <em>Casa</em> means home, while <em>Mika</em> is the affectionate nickname given to Minh Khánh by cherished friends. Casa Mika — Mika’s Home — warmly welcomes you to slow down, share laughter, and savour the art of living.',
      metaStat1Title: 'My Khe Destination', metaStat1Sub: '37 Tran Bach Dang, Da Nang',
      metaStat2Title: '1,400m² Estate', metaStat2Sub: 'Garden, glasshouse, bar & main hall',
      metaStat3Title: 'Open Daily', metaStat3Sub: 'Welcoming guests 07:30 – 00:00',
      quote1: 'We do not simply serve dishes.<br>We create a welcoming sanctuary<br><em>to celebrate life’s finest reunions.</em>',
      quote2: 'Step away from the rush of the city.<br>At Casa Mika, conversations linger<br><em>and time is savoured.</em>',
      reelsEyebrow: '— Casa Mika Moments',
      reelsTitle: 'Life in the garden,<br><em>captured in 9:16.</em>',
      reelsSub: 'Two vivid cinematic perspectives showcasing the vibrant atmosphere and living rhythm of Casa Mika.',
      reelsBadge1: 'Garden & Atmosphere',
      reelsBadge2: 'Culinary & Lifestyle',
      valuesEyebrow: '— Our Philosophy',
      valuesTitle: 'Four culinary pillars<br><em>we honour every day.</em>',
      valuesSub: 'Every dish and crafted beverage at Casa Mika is a testament to mindful dedication, exacting standards, and genuine passion for gastronomy.',
      v1Num: '01 / Rhythm', v1Title: 'Unhurried Dining, <em>in your own time.</em>', v1Desc: 'Service flows in harmony with the natural cadence of your table. We celebrate every moment you take to linger, share, and connect.',
      v2Num: '02 / Sourcing', v2Title: 'Fresh at the Source, <em>celebrating seasons.</em>', v2Desc: 'From daily catches from Da Nang’s coastal waters to fragrant homegrown garden herbs, premium seasonal ingredients form the essence of our culinary craft.',
      v3Num: '03 / Kitchen', v3Title: 'East Meets West, <em>contemporary harmony.</em>', v3Desc: 'Our chefs balance classical European culinary techniques with the vibrant aromatic heritage of Vietnamese cuisine, crafting dishes that are innovative yet deeply comforting.',
      v4Num: '04 / Craftsmanship', v4Title: 'Artisanal Touch, <em>in every detail.</em>', v4Desc: 'From the bartender’s precise shake to the savoury sizzle of the signature BBQ platter and delicate garnish, each plate is shaped by hands devoted to the craft.',
      dayEyebrow: '— A Day at Casa Mika',
      dayTitle: 'Every hour of the day,<br><em>a distinct mood.</em>',
      daySub: 'From morning sunlight through verdant leaves to warm evening candlelight, Casa Mika offers a tranquil space tailored for every moment.',
      dayMornName: 'Morning', dayMornDesc: 'Gentle rays pierce the canopy. Begin your morning with artisanal coffee, fragrant Signature Beef Phở, or a hearty Casa Mika Breakfast.',
      dayNoonName: 'Noon', dayNoonDesc: 'Delight in a breezy lunch beneath the shade or in the glasshouse. Savour tender Shaken Beef Tenderloin or crisp Seafood Lotus Stem Salad with colleagues and friends.',
      dayAftName: 'Afternoon', dayAftDesc: 'An idyllic moment for quiet reflection or relaxed conversation. Enjoy a chilled Sunset Over My Khe mocktail as sea breezes sweep through the terrace.',
      dayEveName: 'Evening', dayEveDesc: 'Candles flicker into life. Indulge in our signature BBQ Mixed Platter, decadent Lobster with Salted Egg Sauce, and fine wines, set to live Grand Piano and Guitar melodies.',
      showcaseEyebrow: '— Handpicked Selection',
      showcaseTitle: 'Signature Flavours,<br><em>curated for your table.</em>',
      showcaseSub: 'From morning market seafood to artisanal libations at dusk, each creation tells a story of passion.',
      tabAll: 'Featured', tabFood: 'Culinary', tabDrink: 'Coffee & Drinks', tabMocktail: 'Mocktails & Cocktails',
      viewFullMenuBtn: 'Explore Complete Interactive Menu',
      atmosEyebrow: '— Space & Experience',
      atmosTitle: 'Two signature features<br><em>that captivate the senses.</em>',
      atmosSub: 'Refined architecture and warm acoustic artistry seamlessly intertwined for your comfort.',
      atmosCard1Tag: 'In the main hall',
      atmosCard1Title: 'Floor-to-Ceiling Wine Wall & Cocktail Bar',
      atmosCard1Desc: 'A dramatic glass-and-metal wine display soaring to the ceiling, showcasing hundreds of fine vintages. The central bar is where our mixologists craft inspired cocktails celebrating coastal Da Nang.',
      atmosCard2Tag: 'From the foyer & bar',
      atmosCard2Title: 'Every Evening, Grand Piano & Acoustic Guitar',
      atmosCard2Desc: 'Beginning at 19:00 nightly, warm Grand Piano and acoustic guitar melodies weave through the hall — composed not as an overpowering stage show, but to gently enrich your table conversation.',
      eventsEyebrow: '— Private Events',
      eventsTitle: '1,400m² of garden estate, <em>composed for your evening.</em>',
      eventsDesc: 'Garden weddings, milestone birthdays, corporate dinners, and brand launches. Glasshouse for 60, terrace for 120, and full garden estate for up to 300 guests. Bespoke menus, sommelier recommendations, and discreet hospitality.',
      eventsZalo: 'Plan via Zalo',
      eventsTel: 'or call +84 708 888 007',
      visitEyebrow: '— Visit Us',
      visitTitle: 'The door is open.<br><em>Join us for a meal, stay for an unforgettable evening.</em>',
      visitSub: 'A garden dining retreat at 37 Tran Bach Dang, My Khe Beach, Da Nang. Open daily from 07:30 to 00:00.',
      btnReserve: 'Reserve a Table',
      btnZalo: 'Message on Zalo',
      btnFacebook: 'Visit Facebook',
      footerBrand: 'A garden dining retreat & acoustic lounge by My Khe Beach.',
      footerVisit: 'Visit',
      footerContact: 'Contact',
      footerFollow: 'Follow'
    },
    de: {
      lang: 'de',
      title: 'Casa Mika — Garten-Dining, Weinbar & Akustik-Lounge | Da Nang',
      metaDesc: 'Erleben Sie 1.400m² Garten-Gastronomie am My Khe Strand, Da Nang. Zeitgenössische Fusionsküche, erlesener Weinkeller und allabendliche Piano- & Gitarrenklänge.',
      navAbout: 'Über uns',
      navMenu: 'Speisekarte',
      navNews: 'Aktuelles',
      navCareer: 'Karriere',
      navReserve: 'Reservieren',
      heroEyebrow: '— Casa Mika Da Nang',
      heroTitle: 'Eine grüne Oase<br>am My Khe Strand,<br><em>wo die Zeit dem Genuss<br>Raum gibt.</em>',
      heroSub: 'Ein 1.400m² großes Garten-Restaurant in Da Nang — eine harmonische Verbindung aus zeitgenössischer asiatisch-europäischer Küche, erlesenen Weinen und warmen Akustikklängen zur Abenddämmerung.',
      heroBtnReserve: 'Tisch reservieren',
      heroBtnMenu: 'Speisekarte ansehen',
      storyEyebrow: '— Unsere Geschichte',
      storyTitle: 'Ein offenes Zuhause,<br><em>inmitten eines tropischen Gartens.</em>',
      storyLede: 'Casa Mika entstand aus der tiefen Verbundenheit zum My Khe Strand und der gastronomischen Leidenschaft der Gründerin Nguyễn Thị Minh Khánh. Ihr Herzenswunsch war es, ein echtes „Zuhause“ zu schaffen — einen einladenden Ort, an dem Freunde und Genießer bei ehrlicher Küche und guten Gesprächen zusammenfinden.',
      storyBody1: 'In der Tran Bach Dang Straße 37, nur wenige Schritte vom Strand von My Khe entfernt, erstreckt sich Casa Mika über ein 1.400m² großes Areal voller Grün. Ein lichtdurchflutetes Glashaus, eine lauschige Gartenterrasse, eine moderne Bar vor einer deckenhohen Weinwand und ein eleganter Flügel im Hauptsaal verbinden sich zu einem stilvollen, entspannten Gastronomieerlebnis.',
      storyBody2: 'Im Spanischen bedeutet <em>Casa</em> Haus oder Heim, während <em>Mika</em> der liebevolle Spitzname ist, den Freunde Minh Khánh gaben. Casa Mika — Mikas Haus — lädt Sie ein, das Leben in aller Ruhe zu genießen.',
      metaStat1Title: 'Standort My Khe', metaStat1Sub: '37 Tran Bach Dang, Da Nang',
      metaStat2Title: '1.400m² Anwesen', metaStat2Sub: 'Garten, Glashaus, Bar & Hauptsaal',
      metaStat3Title: 'Täglich geöffnet', metaStat3Sub: 'Herzlich willkommen von 07:30 – 00:00 Uhr',
      quote1: 'Wir servieren nicht nur Speisen.<br>Wir schaffen einen Raum der Begegnung,<br><em>um das Zusammensein zu feiern.</em>',
      quote2: 'Lassen Sie die Hektik der Stadt hinter sich.<br>Im Casa Mika verweilen die Gespräche,<br><em>und die Zeit dehnt sich sanft aus.</em>',
      reelsEyebrow: '— Casa Mika Momente',
      reelsTitle: 'Der Garten im 9:16-Format,<br><em>lebendig und nah.</em>',
      reelsSub: 'Zwei stimmungsvolle vertikale Videos, die die besondere Atmosphäre unseres Hauses einfangen.',
      reelsBadge1: 'Garten & Ambiente',
      reelsBadge2: 'Kulinarik & Lebensart',
      valuesEyebrow: '— Unsere Philosophie',
      valuesTitle: 'Vier kulinarische Leitgedanken,<br><em>die wir täglich leben.</em>',
      valuesSub: 'Jedes Gericht und jedes Getränk im Casa Mika spiegelt Achtsamkeit, hohe Qualitätsansprüche und echte Leidenschaft für Gastlichkeit wider.',
      v1Num: '01 / Rhythmus', v1Title: 'Muße und Zeit, <em>ohne jede Eile.</em>', v1Desc: 'Der Service richtet sich nach dem Fluss Ihrer Tischgespräche. Nehmen Sie sich Zeit — Ihr langes Verweilen ist uns eine Freude.',
      v2Num: '02 / Herkunft', v2Title: 'Frische Zutaten, <em>im Einklang mit den Jahreszeiten.</em>', v2Desc: 'Von fangfrischen Meeresfrüchten aus Da Nang bis zu duftenden Gartenkräutern: Hochwertige, saisonale Produkte bilden das Fundament unserer Küche.',
      v3Num: '03 / Küche', v3Title: 'Asien trifft Europa, <em>zeitgemäß vereint.</em>', v3Desc: 'Unser Küchenteam verbindet klassische europäische Kochtechniken mit den aromatischen Tiefen der vietnamesischen Küche zu einem harmonischen Geschmackserlebnis.',
      v4Num: '04 / Handwerk', v4Title: 'Liebevolles Handwerk, <em>in jedem Detail.</em>', v4Desc: 'Vom geschulten Handgriff des Bartenders über das brutzelnde Aroma der feinen Grillplatte bis zum letzten Blatt der Garnitur — alles entsteht mit Hingabe.',
      dayEyebrow: '— Ein Tag im Casa Mika',
      dayTitle: 'Jede Tageszeit,<br><em>ihre eigene Stimmung.</em>',
      daySub: 'Vom ersten Sonnenstrahl im Blätterdach bis zum warmen Kerzenschein am Abend hält Casa Mika für jeden Moment den passenden Rückzugsort bereit.',
      dayMornName: 'Morgen', dayMornDesc: 'Die Morgensonne bricht durch das Grün. Beginnen Sie den Tag mit feinem Kaffee, aromatischer Rindfleisch-Phở oder dem herzhaften Casa Mika Signature Frühstück.',
      dayNoonName: 'Mittag', dayNoonDesc: 'Mittagessen im kühlen Schatten oder Glashaus: Genießen Sie geschütteltes Rindfleisch (Bò Lúc Lắc) oder frischen Meeresfrüchte-Lotussalat mit Geschäftspartnern und Freunden.',
      dayAftName: 'Nachmittag', dayAftDesc: 'Zeit für Ruhe und inspirierende Gespräche. Ein eisgekühlter Sunset Over My Khe Mocktail erfrischt, während eine sanfte Meeresbrise herüberweht.',
      dayEveName: 'Abend', dayEveDesc: 'Kerzenschein erhellt den Abend. Feine gemischte Grillplatte, Hummer in Salzeisauce und edle Weine, begleitet von warmen Live-Klängen an Flügel und Gitarre.',
      showcaseEyebrow: '— Ausgewählte Köstlichkeiten',
      showcaseTitle: 'Casa Mika Aromen,<br><em>für Ihren Tisch kreiert.</em>',
      showcaseSub: 'Vom frischen Marktfang am Morgen bis zu kunstvollen Drinks bei Sonnenuntergang.',
      tabAll: 'Highlights', tabFood: 'Speisen', tabDrink: 'Kaffee & Getränke', tabMocktail: 'Mocktails & Cocktails',
      viewFullMenuBtn: 'Zur vollständigen interaktiven Speisekarte',
      atmosEyebrow: '— Raum & Atmosphäre',
      atmosTitle: 'Zwei markante Elemente,<br><em>die den Raum verzaubern.</em>',
      atmosSub: 'Stilvolle Architektur und dezente Akustikmusik im harmonischen Einklang.',
      atmosCard1Tag: 'Im Hauptsaal',
      atmosCard1Title: 'Deckenhohe Weinwand & Moderne Bar',
      atmosCard1Desc: 'Eine elegante Glasvitrine entlang des Saals präsentiert hunderte auserlesene Spitzenweine. An der Bar mixen unsere Bartender raffinierte Cocktails mit Noten der Küste von Da Nang.',
      atmosCard2Tag: 'Foyer & Bar',
      atmosCard2Title: 'Jeden Abend: Grand Piano & Akustikgitarre',
      atmosCard2Desc: 'Täglich ab 19:00 Uhr erfüllen feine Klänge am Flügel und an der Akustikgitarre den Raum — sanft und dezent komponiert, um Ihre persönlichen Gespräche zu begleiten.',
      eventsEyebrow: '— Private Feiern & Events',
      eventsTitle: '1.400m² Gartenanwesen, <em>komponiert für Ihren Abend.</em>',
      eventsDesc: 'Hochzeiten, Geburtstage, Firmenbankette und Produktpräsentationen. Glashaus für 60, Terrasse für 120 und der gesamte Garten für bis zu 300 Gäste. Individuelle Menüs, Weinauswahl und diskreter Service.',
      eventsZalo: 'Über Zalo planen',
      eventsTel: 'oder telefonisch +84 708 888 007',
      visitEyebrow: '— Besuch & Reservierung',
      visitTitle: 'Die Tür steht offen.<br><em>Kommen Sie für ein gutes Essen, bleiben Sie für einen unvergesslichen Abend.</em>',
      visitSub: 'Garten-Gastronomie in der Trần Bạch Đằng 37, My Khe Strand, Da Nang. Täglich geöffnet von 07:30 bis 00:00 Uhr.',
      btnReserve: 'Tisch reservieren',
      btnZalo: 'Auf Zalo schreiben',
      btnFacebook: 'Facebook besuchen',
      footerBrand: 'Garten-Restaurant & Akustik-Lounge am My Khe Strand.',
      footerVisit: 'Besuch',
      footerContact: 'Kontakt',
      footerFollow: 'Folgen'
    },
    ko: {
      lang: 'ko',
      title: '까사 미카 (Casa Mika) — 미케 비치 가든 다이닝 & 와인 라운지 | 다낭',
      metaDesc: '다낭 미케 비치 옆 1,400m² 프리미엄 가든 다이닝. 아시안 & 유러피안 컨템포러리 퀴진, 엄선된 와인 컬렉션, 매일 밤 라이브 그랜드 피아노 & 어쿠스틱 기타 연주.',
      navAbout: '소개',
      navMenu: '메뉴',
      navNews: '소식',
      navCareer: '채용',
      navReserve: '예약하기',
      heroEyebrow: '— 까사 미카 다낭',
      heroTitle: '미케 비치 곁<br>싱그러운 휴식의 정원,<br><em>시간마저 머무는<br>특별한 미식의 순간.</em>',
      heroSub: '다낭 1,400m² 열대 정원의 품격 있는 다이닝 공간 — 동서양의 조화로운 미식, 엄선된 와인 컬렉션, 그리고 노을빛 아래 울려 퍼지는 감미로운 어쿠스틱 선율.',
      heroBtnReserve: '지금 예약하기',
      heroBtnMenu: '전체 메뉴 보기',
      storyEyebrow: '— 브랜드 이야기',
      storyTitle: '열대 정원 속,<br><em>모두를 위한 따뜻한 집.</em>',
      storyLede: '까사 미카는 설립자 응우옌 티 민 칸(Nguyễn Thị Minh Khánh)의 미케 해변에 대한 애정과 미식에 대한 열정에서 출발했습니다. 소중한 사람들과 둘러앉아 정성 어린 요리와 진솔한 대화를 나눌 수 있는 진정한 의미의 \'집\'을 선물하고자 했습니다.',
      storyBody1: '미케 비치에서 도보 거리에 위치한 쩐박당(Trần Bạch Đằng) 37번지, 1,400m² 규모의 드넓은 녹음 속에 까사 미카가 자리합니다. 채광이 아름다운 글래스하우스, 푸른 가든 테라스, 천장 높이의 와인 월과 모던 바, 메인 홀의 웅장한 그랜드 피아노까지 — 모든 공간은 도심의 번잡함을 잊고 여유로운 미식을 온전히 즐길 수 있도록 세심하게 디자인되었습니다.',
      storyBody2: '스페인어로 <em>Casa</em>는 \'집\'을 뜻하며, <em>Mika</em>는 친구들이 설립자 민칸을 부르던 다정한 애칭입니다. \'미카의 집\'이라는 이름처럼, 까사 미카는 언제나 여행자 여러분을 따스하게 맞이합니다.',
      metaStat1Title: '미케 비치 명소', metaStat1Sub: '다낭 쩐박당 37번지',
      metaStat2Title: '1,400m² 공간', metaStat2Sub: '열대 정원, 글래스하우스, 바 & 메인 홀',
      metaStat3Title: '매일 운영', metaStat3Sub: '오전 07:30 – 자정 00:00',
      quote1: '우리는 단순히 음식을 내놓지 않습니다.<br>소중한 사람들과의 만남이 더욱 빛나도록<br><em>정성스러운 온기를 채워둡니다.</em>',
      quote2: '도시의 바쁜 걸음을 잠시 멈추세요.<br>까사 미카에서 나누는 이야기는 더 깊어지고,<br><em>시간의 여유는 마음을 채웁니다.</em>',
      reelsEyebrow: '— 까사 미카 하이라이트',
      reelsTitle: '생생한 정원의 숨결,<br><em>9:16 영상으로 만나다.</em>',
      reelsSub: '까사 미카의 가장 눈부신 순간을 담아낸 두 편의 세로형 시네마틱 릴스 영상입니다.',
      reelsBadge1: '정원과 공간',
      reelsBadge2: '미식과 라이프스타일',
      valuesEyebrow: '— 우리의 철학',
      valuesTitle: '정성을 다해 지켜가는<br><em>네 가지 미식 원칙.</em>',
      valuesSub: '까사 미카의 모든 요리와 음료에는 정직한 재료, 엄격한 기준, 미식을 향한 진심 어린 열정이 깃들어 있습니다.',
      v1Num: '01 / 호흡', v1Title: '재촉 없는 미식, <em>당신의 속도에 맞추어.</em>', v1Desc: '요리와 와인은 식탁의 대화 흐름에 맞추어 여유롭게 서빙됩니다. 손님이 머무는 모든 순간을 소중히 여깁니다.',
      v2Num: '02 / 재료', v2Title: '신선한 본연의 맛, <em>자연과 계절을 담다.</em>', v2Desc: '다낭 청정 바다의 당일 수산물부터 싱그러운 텃밭 허브까지, 최상의 제철 식재료는 맛의 가장 순수한 시작입니다.',
      v3Num: '03 / 주방', v3Title: '동서양의 조화, <em>현대적인 감각.</em>', v3Desc: '숙련된 셰프진이 유럽 전통 조리 기법과 베트남 고유의 풍미를 조화롭게 엮어내어 품격 있으면서도 친근한 미식을 완성합니다.',
      v4Num: '04 / 손길', v4Title: '장인 정신의 손길, <em>디테일의 완성.</em>', v4Desc: '바텐더의 유려한 셰이킹, 직화로 구워낸 믹스 바비큐의 풍미, 정갈한 플레이팅까지 모든 과정에 정성을 쏟습니다.',
      dayEyebrow: '— 까사 미카의 하루',
      dayTitle: '하루의 시간마다,<br><em>피어나는 고유한 무드.</em>',
      daySub: '나뭇잎을 투과하는 아침 햇살부터 촛불이 일렁이는 밤까지, 까사 미카는 매 순간 특별한 휴식을 선사합니다.',
      dayMornName: '아침', dayMornDesc: '신선한 공기 속 향긋한 커피 한 잔, 따끈한 시그니처 소고기 쌀국수나 풍성한 까사 미카 조식으로 기분 좋은 아침을 엽니다.',
      dayNoonName: '점심', dayNoonDesc: '시원한 그늘 아래나 글래스하우스에서 즐기는 점심. 부드러운 소고기 룩락과 아삭한 해산물 연근 샐러드로 활력을 더해보세요.',
      dayAftName: '오후', dayAftDesc: '바닷바람이 부드럽게 불어오는 여유로운 오후, 시원한 선셋 오버 미케(Sunset Over My Khe) 목테일과 함께 깊어가는 담소를 나눕니다.',
      dayEveName: '저녁', dayEveDesc: '촛불이 일렁이는 낭만의 밤. 푸짐한 믹스 바비큐 플래터와 솔티드 에그 랍스터, 그리고 감미로운 피아노 & 기타 라이브 선율이 함께합니다.',
      showcaseEyebrow: '— 추천 메뉴 컬렉션',
      showcaseTitle: '까사 미카의 풍미,<br><em>식탁을 위한 엄선.</em>',
      showcaseSub: '신선한 당일 해산물 요리부터 해 질 녘 분위기를 돋우는 감각적인 칵테일까지.',
      tabAll: '대표 메뉴', tabFood: '요리', tabDrink: '커피 & 음료', tabMocktail: '목테일 & 칵테일',
      viewFullMenuBtn: '전체 메뉴 및 와인 리스트 보기',
      atmosEyebrow: '— 공간과 예술',
      atmosTitle: '시선을 사로잡는<br><em>두 가지 특별한 매력.</em>',
      atmosSub: '품격 있는 건축과 감미로운 음악이 조화를 이루어 잊지 못할 시간을 선사합니다.',
      atmosCard1Tag: '메인 홀에서',
      atmosCard1Title: '천장 높이의 와인 월 & 모던 칵테일 바',
      atmosCard1Desc: '높은 층고를 따라 시원하게 뻗은 글래스 와인 셀러에 세계 각국의 명품 와인이 보관되어 있습니다. 바에서는 다낭의 바다를 닮은 시그니처 칵테일을 선보입니다.',
      atmosCard2Tag: '로비 & 마블 바',
      atmosCard2Title: '매일 밤, 그랜드 피아노 & 어쿠스틱 기타 라이브',
      atmosCard2Desc: '매일 저녁 7시부터 감미로운 그랜드 피아노와 어쿠스틱 기타 선율이 홀 안을 따스하게 채웁니다. 무대의 요란함 대신 식탁 위의 소중한 대화를 더욱 빛내줍니다.',
      eventsEyebrow: '— 프라이빗 이벤트',
      eventsTitle: '1,400m² 정원 공간, <em>당신의 특별한 행사를 위해.</em>',
      eventsDesc: '야외 웨딩, 기념 파티, 기업 만찬 및 브랜드 론칭. 온실 60석, 테라스 120석, 전체 정원 최대 300명까지 수용 가능합니다. 맞춤형 코스 메뉴와 전문 소믈리에의 와인 페어링을 제공합니다.',
      eventsZalo: 'Zalo로 문의하기',
      eventsTel: '또는 전화 문의 +84 708 888 007',
      visitEyebrow: '— 방문 안내',
      visitTitle: '문은 언제나 열려 있습니다.<br><em>맛있는 식사부터 낭만 가득한 밤까지 함께하세요.</em>',
      visitSub: '다낭 미케 비치 쩐박당 37번지 가든 다이닝. 매일 오전 07:30부터 자정까지 운영됩니다.',
      btnReserve: '예약하기',
      btnZalo: 'Zalo로 문의',
      btnFacebook: '페이스북 방문',
      footerBrand: '미케 비치 곁 프리미엄 가든 다이닝 & 어쿠스틱 라운지.',
      footerVisit: '방문 안내',
      footerContact: '연락처',
      footerFollow: 'SNS'
    }
  }[lang];

  // KHÔNG HIỂN THỊ GIÁ TIỀN TRÊN CARD MÓN ĂN
  let showcaseCardsHtml = showcaseItems.map(item => {
    const name = lang === 'vi' ? item.nameVi : lang === 'de' ? item.nameDe : lang === 'ko' ? item.nameKo : item.nameEn;
    const badge = lang === 'vi' ? item.badgeVi : lang === 'de' ? item.badgeDe : lang === 'ko' ? item.badgeKo : item.badgeEn;
    return `
            <article class="ms-dish-card fade-up" data-category="${item.cat}">
                <div class="ms-dish-img-wrap">
                    <img src="${item.img}" alt="${name}" class="ms-dish-img" loading="lazy">
                </div>
                <div class="ms-dish-body">
                    <div class="ms-dish-header">
                        <h3 class="ms-dish-name">${name}</h3>
                    </div>
                    <span class="ms-dish-cat">${badge}</span>
                </div>
            </article>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="${t.lang}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#1A1410">
    <script src="/gate.js"></script>
    <script>try { localStorage.setItem('mika-lang', '${t.lang}'); } catch (e) { }</script>
    <meta name="description" content="${t.metaDesc}">
    <meta name="robots" content="index, follow">
    <meta property="og:url" content="https://casamika.com/${t.lang}/">
    <meta property="og:title" content="${t.title}">
    <meta property="og:description" content="${t.metaDesc}">
    <meta property="og:image" content="/image/image3d.jpg">
    <meta property="og:type" content="website">
    <title>${t.title}</title>

    <link rel="canonical" href="https://casamika.com/${t.lang}/">
    <link rel="alternate" hreflang="en" href="https://casamika.com/en/">
    <link rel="alternate" hreflang="vi" href="https://casamika.com/vi/">
    <link rel="alternate" hreflang="de" href="https://casamika.com/de/">
    <link rel="alternate" hreflang="ko" href="https://casamika.com/ko/">
    <link rel="alternate" hreflang="x-default" href="https://casamika.com/en/">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
    <link rel="preload" as="image" href="/image/image3d.jpg">
    <link rel="stylesheet" href="/style.css">
</head>

<body class="site-main">

    <!-- ===== Nav ===== -->
    <nav class="ms-nav" id="msNav">
        <div class="container ms-nav-inner">
            <a href="/${t.lang}/" class="ms-logo" aria-label="Casa Mika">
                <img src="/image/logo/logo-new.png" alt="Casa Mika" onerror="this.outerHTML='<span class=&quot;ms-logo-text&quot;>CASA MIKA</span>';">
            </a>
            <div class="ms-nav-links" id="msNavLinks">
                <a href="#story" class="ms-nav-link">${t.navAbout}</a>
                <a href="/${t.lang}/menu/" class="ms-nav-link">${t.navMenu}</a>
                <a href="/${t.lang}/news/" class="ms-nav-link">${t.navNews}</a>
                <a href="/${t.lang}/career/" class="ms-nav-link">${t.navCareer}</a>
                <a href="${reserveUrl}" target="_blank" rel="noopener" class="ms-btn ms-btn-outline ms-btn-sm">${t.navReserve}</a>
            </div>
            <span class="ms-lang-switch" role="group" aria-label="Language">
                <a href="/vi/" class="ms-lang ${t.lang === 'vi' ? 'is-active' : ''}" data-lang="vi">VI</a>
                <span class="ms-lang-sep" aria-hidden="true">|</span>
                <a href="/en/" class="ms-lang ${t.lang === 'en' ? 'is-active' : ''}" data-lang="en">EN</a>
                <span class="ms-lang-sep" aria-hidden="true">|</span>
                <a href="/de/" class="ms-lang ${t.lang === 'de' ? 'is-active' : ''}" data-lang="de">DE</a>
                <span class="ms-lang-sep" aria-hidden="true">|</span>
                <a href="/ko/" class="ms-lang ${t.lang === 'ko' ? 'is-active' : ''}" data-lang="ko">KO</a>
            </span>
            <button class="ms-nav-toggle" id="msNavToggle" aria-label="Menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- ===== Hero Header (About ở đầu trang) ===== -->
    <header class="ms-hero ms-about-hero" id="hero">
        <div class="ms-hero-bg">
            <img src="/image/image3d.jpg" alt="" class="ms-hero-image" aria-hidden="true">
            <div class="ms-hero-overlay"></div>
        </div>
        <div class="container ms-hero-content">
            <span class="ms-hero-eyebrow fade-up">${t.heroEyebrow}</span>
            <h1 class="ms-hero-title fade-up delay-2">${t.heroTitle}</h1>
            <p class="ms-hero-stub-note fade-up delay-3">${t.heroSub}</p>
            <div class="ms-hero-actions fade-up delay-3">
                <a href="${reserveUrl}" target="_blank" rel="noopener" class="ms-btn ms-btn-primary ms-btn-lg">${t.heroBtnReserve}</a>
                <a href="/${t.lang}/menu/" class="ms-btn ms-btn-outline ms-btn-lg">${t.heroBtnMenu}</a>
            </div>
        </div>
    </header>

    <!-- ===== Section Câu Chuyện ===== -->
    <section class="ms-section ms-house" id="story">
        <div class="container ms-editorial">
            <div class="ms-editorial-img fade-in">
                <img src="/image/hero/thehouse-new.jpg" alt="Casa Mika" class="ms-photo-img" style="aspect-ratio: 4/5; object-fit: cover;" loading="eager">
            </div>
            <div class="ms-editorial-text">
                <span class="ms-eyebrow fade-up">${t.storyEyebrow}</span>
                <h2 class="ms-title fade-up">${t.storyTitle}</h2>
                <p class="ms-lede fade-up delay-1">${t.storyLede}</p>
                <p class="ms-body fade-up delay-2">${t.storyBody1}</p>
                <p class="ms-body fade-up delay-3">${t.storyBody2}</p>
                <ul class="ms-house-meta fade-up delay-3">
                    <li><strong>${t.metaStat1Title}</strong><span>${t.metaStat1Sub}</span></li>
                    <li><strong>${t.metaStat2Title}</strong><span>${t.metaStat2Sub}</span></li>
                    <li><strong>${t.metaStat3Title}</strong><span>${t.metaStat3Sub}</span></li>
                </ul>
            </div>
        </div>
    </section>

    <!-- ===== Section Quotes ===== -->
    <section class="ms-quote" aria-label="Quote">
        <div class="container">
            <blockquote class="ms-quote-body fade-up">
                <p>${t.quote1}</p>
            </blockquote>
        </div>
    </section>

    <section class="ms-quote" style="padding-top:0;" aria-label="Quote Rhythm">
        <div class="container">
            <blockquote class="ms-quote-body fade-up">
                <p>${t.quote2}</p>
            </blockquote>
        </div>
    </section>

    <!-- ===== 2 VIDEO HIGHLIGHT 9:16 (NỔI BẬT NGAY SAU QUOTE) ===== -->
    <section class="ms-reels-section" id="reels">
        <div class="container center-text">
            <span class="ms-eyebrow fade-up">${t.reelsEyebrow}</span>
            <h2 class="ms-title fade-up">${t.reelsTitle}</h2>
            <p class="ms-section-sub fade-up delay-1">${t.reelsSub}</p>
            
            <div class="ms-reels-grid">
                <!-- Reel Video 1 -->
                <div class="ms-reel-card fade-up">
                    <span class="ms-reel-badge">${t.reelsBadge1}</span>
                    <video class="ms-reel-video" src="/video/video-highlight-1.mp4" playsinline loop muted autoplay></video>
                    <button type="button" class="ms-reel-sound-btn" aria-label="Sound Toggle">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                    </button>
                </div>
                <!-- Reel Video 2 -->
                <div class="ms-reel-card fade-up delay-1">
                    <span class="ms-reel-badge">${t.reelsBadge2}</span>
                    <video class="ms-reel-video" src="/video/video-highlight-2.mp4" playsinline loop muted autoplay></video>
                    <button type="button" class="ms-reel-sound-btn" aria-label="Sound Toggle">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- ===== Triết Lý Bốn Quy Tắc ===== -->
    <section class="ms-section ms-values" id="values">
        <div class="container center-text">
            <span class="ms-eyebrow fade-up">${t.valuesEyebrow}</span>
            <h2 class="ms-title fade-up">${t.valuesTitle}</h2>
            <p class="ms-section-sub fade-up delay-1">${t.valuesSub}</p>
        </div>
        <div class="container ms-values-grid">
            <article class="ms-value fade-up">
                <span class="ms-value-num">${t.v1Num}</span>
                <h3 class="ms-value-name">${t.v1Title}</h3>
                <p class="ms-value-desc">${t.v1Desc}</p>
            </article>
            <article class="ms-value fade-up delay-1">
                <span class="ms-value-num">${t.v2Num}</span>
                <h3 class="ms-value-name">${t.v2Title}</h3>
                <p class="ms-value-desc">${t.v2Desc}</p>
            </article>
            <article class="ms-value fade-up delay-2">
                <span class="ms-value-num">${t.v3Num}</span>
                <h3 class="ms-value-name">${t.v3Title}</h3>
                <p class="ms-value-desc">${t.v3Desc}</p>
            </article>
            <article class="ms-value fade-up delay-3">
                <span class="ms-value-num">${t.v4Num}</span>
                <h3 class="ms-value-name">${t.v4Title}</h3>
                <p class="ms-value-desc">${t.v4Desc}</p>
            </article>
        </div>
    </section>

    <!-- ===== Một Ngày ở Casa Mika ===== -->
    <section class="ms-section ms-day" id="day">
        <div class="container center-text">
            <span class="ms-eyebrow fade-up">${t.dayEyebrow}</span>
            <h2 class="ms-title fade-up">${t.dayTitle}</h2>
            <p class="ms-section-sub fade-up delay-1">${t.daySub}</p>
        </div>
        <div class="container ms-day-grid">
            <article class="ms-day-card fade-up">
                <div class="ms-day-img">
                    <img src="/image/restaurant%20frontage/S%C3%A1ng.jpg" alt="${t.dayMornName}" class="ms-photo-img" style="aspect-ratio: 3/4; object-fit: cover;" loading="lazy">
                </div>
                <span class="ms-day-time">07:30 — 10:30</span>
                <h3 class="ms-day-name">${t.dayMornName}</h3>
                <p class="ms-day-mood">${t.dayMornDesc}</p>
            </article>
            <article class="ms-day-card fade-up delay-1">
                <div class="ms-day-img">
                    <img src="/image/restaurant%20frontage/Tr%C6%B0a.jpg" alt="${t.dayNoonName}" class="ms-photo-img" style="aspect-ratio: 3/4; object-fit: cover;" loading="lazy">
                </div>
                <span class="ms-day-time">11:30 — 14:30</span>
                <h3 class="ms-day-name">${t.dayNoonName}</h3>
                <p class="ms-day-mood">${t.dayNoonDesc}</p>
            </article>
            <article class="ms-day-card fade-up delay-2">
                <div class="ms-day-img">
                    <img src="/image/restaurant%20frontage/Chi%E1%BB%81u.jpg" alt="${t.dayAftName}" class="ms-photo-img" style="aspect-ratio: 3/4; object-fit: cover;" loading="lazy">
                </div>
                <span class="ms-day-time">14:30 — 17:30</span>
                <h3 class="ms-day-name">${t.dayAftName}</h3>
                <p class="ms-day-mood">${t.dayAftDesc}</p>
            </article>
            <article class="ms-day-card fade-up delay-3">
                <div class="ms-day-img">
                    <img src="/image/restaurant%20frontage/T%E1%BB%91i.png" alt="${t.dayEveName}" class="ms-photo-img" style="aspect-ratio: 3/4; object-fit: cover;" loading="lazy">
                </div>
                <span class="ms-day-time">17:30 — 00:00</span>
                <h3 class="ms-day-name">${t.dayEveName}</h3>
                <p class="ms-day-mood">${t.dayEveDesc}</p>
            </article>
        </div>
    </section>

    <!-- ===== Tuyển Chọn Thực Đơn (Showcase Food, Drink, Mocktail - KHÔNG HIỂN THỊ GIÁ) ===== -->
    <section class="ms-showcase" id="showcase">
        <div class="container center-text">
            <span class="ms-eyebrow fade-up">${t.showcaseEyebrow}</span>
            <h2 class="ms-title fade-up">${t.showcaseTitle}</h2>
            <p class="ms-section-sub fade-up delay-1">${t.showcaseSub}</p>
            <div class="ms-showcase-tabs fade-up delay-1">
                <button type="button" class="ms-showcase-tab is-active" data-filter="all">${t.tabAll}</button>
                <button type="button" class="ms-showcase-tab" data-filter="food">${t.tabFood}</button>
                <button type="button" class="ms-showcase-tab" data-filter="drink">${t.tabDrink}</button>
                <button type="button" class="ms-showcase-tab" data-filter="mocktail">${t.tabMocktail}</button>
            </div>
            <div class="ms-showcase-grid">
                ${showcaseCardsHtml}
            </div>
            <div style="margin-top: 3.5rem;" class="fade-up">
                <a href="/${t.lang}/menu/" class="ms-btn ms-btn-primary ms-btn-lg">${t.viewFullMenuBtn}</a>
            </div>
        </div>
    </section>

    <!-- ===== Không Gian (Quầy rượu hiện đại & Piano thực tế) ===== -->
    <section class="ms-section ms-atmos" id="atmosphere">
        <div class="container center-text">
            <span class="ms-eyebrow fade-up">${t.atmosEyebrow}</span>
            <h2 class="ms-title fade-up">${t.atmosTitle}</h2>
            <p class="ms-section-sub fade-up delay-1">${t.atmosSub}</p>
        </div>
        <div class="container ms-atmos-grid">
            <article class="ms-atmos-card fade-up">
                <div class="ms-atmos-img">
                    <img src="/image/venue/wine-wall.jpg" alt="${t.atmosCard1Title}" class="ms-photo-img" style="object-position: center 30%;" loading="lazy">
                </div>
                <span class="ms-atmos-tag">${t.atmosCard1Tag}</span>
                <h3 class="ms-atmos-name">${t.atmosCard1Title}</h3>
                <p class="ms-atmos-desc">${t.atmosCard1Desc}</p>
            </article>
            <article class="ms-atmos-card fade-up delay-1">
                <div class="ms-atmos-img">
                    <img src="/image/venue/bar-piano.jpg" alt="${t.atmosCard2Title}" class="ms-photo-img" loading="lazy">
                </div>
                <span class="ms-atmos-tag">${t.atmosCard2Tag}</span>
                <h3 class="ms-atmos-name">${t.atmosCard2Title}</h3>
                <p class="ms-atmos-desc">${t.atmosCard2Desc}</p>
            </article>
        </div>
        <div class="container ms-atmos-events fade-up delay-2">
            <div class="ms-atmos-events-text">
                <span class="ms-eyebrow">${t.eventsEyebrow}</span>
                <h3 class="ms-atmos-events-title">${t.eventsTitle}</h3>
                <p>${t.eventsDesc}</p>
            </div>
            <div class="ms-atmos-events-cta">
                <a href="https://zalo.me/0708888007" target="_blank" rel="noopener" class="ms-btn ms-btn-primary ms-btn-lg">${t.eventsZalo}</a>
                <a href="tel:+84708888007" class="ms-atmos-events-tel">${t.eventsTel}</a>
            </div>
        </div>
    </section>

    <!-- ===== Đến Thăm & Đặt Bàn ===== -->
    <section class="ms-section ms-final-cta" id="reserve">
        <div class="container">
            <span class="ms-eyebrow fade-up">${t.visitEyebrow}</span>
            <h2 class="ms-title fade-up">${t.visitTitle}</h2>
            <p class="ms-section-sub fade-up delay-1">${t.visitSub}</p>
            <div class="ms-final-cta-actions fade-up delay-2">
                <a href="${reserveUrl}" target="_blank" rel="noopener" class="ms-btn ms-btn-primary ms-btn-lg">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: -2px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    ${t.btnReserve}
                </a>
                <a href="https://zalo.me/0708888007" target="_blank" rel="noopener" class="ms-btn ms-btn-outline ms-btn-lg">${t.btnZalo}</a>
                <a href="https://web.facebook.com/official.casamika" target="_blank" rel="noopener" class="ms-btn ms-btn-outline ms-btn-lg ms-btn-fb">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
                    ${t.btnFacebook}
                </a>
            </div>
        </div>
    </section>

    <!-- ===== Footer ===== -->
    <footer class="ms-footer">
        <div class="container ms-footer-inner">
            <div class="ms-footer-brand">
                <img src="/image/logo/logo-new.png" alt="Casa Mika" onerror="this.outerHTML='<span class=&quot;ms-footer-logo-text&quot;>CASA MIKA</span>';">
                <p>${t.footerBrand}</p>
            </div>
            <div class="ms-footer-col">
                <h4>${t.footerVisit}</h4>
                <p>37 Trần Bạch Đằng<br>Ngũ Hành Sơn, Da Nang<br>Vietnam</p>
                <p>Mon – Fri · 07:30 – 00:00<br>Sat &amp; Sun · 07:30 – 00:30</p>
            </div>
            <div class="ms-footer-col">
                <h4>${t.footerContact}</h4>
                <p><a href="tel:+84708888007">+84 708 888 007</a></p>
                <p><a href="https://zalo.me/0708888007" target="_blank" rel="noopener">Zalo · +84 708 888 007</a></p>
                <p><a href="mailto:info@casamika.com">info@casamika.com</a></p>
            </div>
            <div class="ms-footer-col">
                <h4>${t.footerFollow}</h4>
                <div class="ms-footer-social">
                    <a href="https://www.facebook.com/official.casamika" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/casamika.official/" target="_blank" rel="noopener" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="ms-footer-bottom">
            <div class="container ms-footer-bottom-inner">
                <p>&copy; 2026 Casa Mika. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script type="module" src="/script.js"></script>
</body>

</html>`;

  fs.writeFileSync(path.join(__dirname, lang, 'index.html'), html, 'utf8');
  console.log(`Generated homepage for ${lang}/index.html successfully!`);
}

['vi', 'en', 'de', 'ko'].forEach(buildHomepage);
