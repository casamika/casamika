const fs = require('fs');
const path = require('path');
const { LANGS, LANG_CODES, BADGES, getGoogleReserveUrl, localizedName, hreflangLinks, langSwitcher } = require('./lang-config');

const menuData = JSON.parse(fs.readFileSync(path.join(__dirname, 'image', 'menu-items', 'menu-data.json'), 'utf8'));

const featuredFoodNames = ['Bò Lúc Lắc', 'Tôm Hùm Sốt Trứng Muối', 'Đĩa Nướng Tổng Hợp', 'Gỏi Bơ'];
const otherFoodNames = ['Bánh Mì Nướng Bơ', 'Bạch Tuộc Lớn Nướng Sa Tế', 'Bò Sốt Tiêu Xanh', 'Bánh Xèo Giòn Nhân Bò', 'Cá Điêu Hồng Chiên Mắm Xoài', 'Phở Bò Thượng Hạng', 'Mẹt Casa Mika', 'Casera Salad'];

const featuredDrinkNames = ['Cà Phê Muối Đà Nẵng', 'Pink Mika Latte', 'Trà Sen Tinh Khiết', 'Cà Phê Bơ Dừa'];
const otherDrinkNames = ['Cà Phê Dừa Tuyết', 'Bạc Xỉu Sữa Mềm', 'Cà Phê Sữa Sài Gòn', 'Cappuccino Thượng Hạng', 'Caramel Macchiato Latte', 'Trà Dâu Ổi Hồng', 'Sinh Tố Bơ Đắk Lắk', 'Nước Ép Cam Tươi'];

const featuredMocktailNames = ['Sunset Over My Khe', 'Dragon Bridge Spirit', 'Casa Mika Signature Tonic', 'Midnight Garden'];
const otherMocktailNames = ['Glow Hot Tropical', 'Green Soul Botanical', 'Passion Matcha Fusion', 'Pink Pear Bliss', 'Ruby Exotic Cooler'];

function getCuratedShowcaseItems() {
  const mapItem = (item, cat, isFeatured) => ({
    ...item,
    cat,
    badges: BADGES[cat],
    img: `/image/menu-items/${cat}/${item.dest}`,
    isFeatured
  });

  const featuredFood = featuredFoodNames.map(n => mapItem(menuData.food.find(x => x.nameVi === n), 'food', true));
  const otherFood = otherFoodNames.map(n => mapItem(menuData.food.find(x => x.nameVi === n), 'food', false));

  const featuredDrink = featuredDrinkNames.map(n => mapItem(menuData.drink.find(x => x.nameVi === n), 'drink', true));
  const otherDrink = otherDrinkNames.map(n => mapItem(menuData.drink.find(x => x.nameVi === n), 'drink', false));

  const featuredMocktail = featuredMocktailNames.map(n => mapItem(menuData.mocktail.find(x => x.nameVi === n), 'mocktail', true));
  const otherMocktail = otherMocktailNames.map(n => mapItem(menuData.mocktail.find(x => x.nameVi === n), 'mocktail', false));

  return [
    ...featuredFood,
    ...featuredDrink,
    ...featuredMocktail,
    ...otherFood,
    ...otherDrink,
    ...otherMocktail
  ];
}

const showcaseItems = getCuratedShowcaseItems();


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
    },
    zh: {
      lang: 'zh',
      title: 'Casa Mika — 岘港美溪海滩花园餐厅 · 葡萄酒吧 · 原声音乐酒廊',
      metaDesc: '岘港美溪海滩旁 1,400m² 花园餐厅 Casa Mika：融汇东西方的当代料理、精选葡萄酒珍藏，每晚现场三角钢琴与吉他演奏。',
      navAbout: '关于我们',
      navMenu: '菜单',
      navNews: '动态',
      navCareer: '招聘',
      navReserve: '预订',
      heroEyebrow: '— Casa Mika 岘港',
      heroTitle: '美溪海滩畔<br>一方绿意栖居，<br><em>让时光<br>为心动停留。</em>',
      heroSub: '坐落于岘港的 1,400m² 花园餐厅 — 汇聚东西交融的当代风味、精选葡萄酒珍藏，以及暮色中悠扬的原声乐章。',
      heroBtnReserve: '预订餐位',
      heroBtnMenu: '浏览菜单',
      storyEyebrow: '— 品牌故事',
      storyTitle: '热带花园深处，<br><em>一个温暖的家。</em>',
      storyLede: 'Casa Mika 源于创始人阮氏明庆（Nguyễn Thị Minh Khánh）对美溪海滩的深厚情感与对烹饪艺术的毕生热爱。她心中描绘的是一个真正的家 — 让挚友、家人与懂得品味的旅人围坐一桌，共享真诚的味道与难忘的畅谈。',
      storyBody1: 'Casa Mika 位于陈白藤街 37 号（37 Trần Bạch Đằng），距美溪金色沙滩仅几步之遥，占地 1,400m² 的绿意天地。每一处都经过用心雕琢：洒满阳光的玻璃花房、微风轻拂的花园露台、正对通顶酒墙的现代吧台，以及静立于主厅的优雅三角钢琴。一切只为呈现一段从容、雅致而动人的用餐体验。',
      storyBody2: '在西班牙语中，<em>Casa</em> 意为“家”，而 <em>Mika</em> 是挚友们对明庆的亲昵称呼。Casa Mika — “Mika 的家” — 诚邀您放慢脚步，分享欢笑，细品生活的艺术。',
      metaStat1Title: '美溪海滩地标',
      metaStat1Sub: '岘港陈白藤街 37 号',
      metaStat2Title: '1,400m² 庄园',
      metaStat2Sub: '花园、玻璃花房、酒吧与主厅',
      metaStat3Title: '每日营业',
      metaStat3Sub: '迎客时间 07:30 – 00:00',
      quote1: '我们不只是端上一道道菜肴。<br>我们营造一处温馨的港湾，<br><em>见证人生中每一次美好相聚。</em>',
      quote2: '暂别城市的匆忙。<br>在 Casa Mika，话语悠长，<br><em>时光值得细细品味。</em>',
      reelsEyebrow: '— Casa Mika 精彩瞬间',
      reelsTitle: '花园中的生活，<br><em>定格于 9:16 画幅。</em>',
      reelsSub: '两段生动的竖屏影像，展现 Casa Mika 的鲜活氛围与生活韵律。',
      reelsBadge1: '花园与氛围',
      reelsBadge2: '美食与生活',
      valuesEyebrow: '— 我们的理念',
      valuesTitle: '四大美食信条，<br><em>日日坚守。</em>',
      valuesSub: 'Casa Mika 的每一道菜、每一杯饮品，都凝聚着用心的投入、严苛的标准与对美食的真挚热爱。',
      v1Num: '01 / 节奏',
      v1Title: '从容用餐，<em>随您心意。</em>',
      v1Desc: '上菜节奏顺应餐桌的自然韵律。您每一刻的停留、分享与交流，都值得被珍视。',
      v2Num: '02 / 食材',
      v2Title: '源头鲜选，<em>致敬时令。</em>',
      v2Desc: '从岘港近海每日捕捞的海产，到自家花园芬芳的香草，优质的时令食材是我们料理的灵魂。',
      v3Num: '03 / 厨房',
      v3Title: '东西交融，<em>当代和鸣。</em>',
      v3Desc: '主厨们以经典欧式烹饪技法，融合越南菜鲜活的香料传统，打造既富新意又温暖人心的菜肴。',
      v4Num: '04 / 匠心',
      v4Title: '匠心之手，<em>尽在细节。</em>',
      v4Desc: '从调酒师精准的摇壶，到招牌烧烤拼盘滋滋作响的香气与精致的点缀，每一道菜都出自潜心技艺的双手。',
      dayEyebrow: '— Casa Mika 的一天',
      dayTitle: '一天中的每个时刻，<br><em>都有独特的心境。</em>',
      daySub: '从穿过绿叶的晨光，到温暖的夜晚烛光，Casa Mika 为每一个时刻备好一方宁静天地。',
      dayMornName: '清晨',
      dayMornDesc: '柔和的阳光穿透树荫。以一杯手工咖啡、一碗香浓的招牌牛肉河粉，或一份丰盛的 Casa Mika 早餐，开启美好清晨。',
      dayNoonName: '正午',
      dayNoonDesc: '在树荫下或玻璃花房中享用清爽午餐。与同事好友共品鲜嫩的越式骰子牛柳，或爽脆的海鲜藕带沙拉。',
      dayAftName: '午后',
      dayAftDesc: '静心独处或闲适畅谈的惬意时光。当海风拂过露台，来一杯冰爽的「美溪日落」（Sunset Over My Khe）无酒精鸡尾酒。',
      dayEveName: '夜晚',
      dayEveDesc: '烛光渐次亮起。品味招牌烧烤拼盘、奢享咸蛋黄龙虾与佳酿美酒，伴着现场三角钢琴与吉他的悠扬旋律。',
      showcaseEyebrow: '— 精选推荐',
      showcaseTitle: '招牌风味，<br><em>为您的餐桌精心甄选。</em>',
      showcaseSub: '从清晨市场的鲜活海产，到暮色中的匠心调饮，每一道作品都诉说着热爱。',
      tabAll: '精选',
      tabFood: '美食',
      tabDrink: '咖啡与饮品',
      tabMocktail: '特调饮品',
      viewFullMenuBtn: '浏览完整互动菜单',
      atmosEyebrow: '— 空间与体验',
      atmosTitle: '两大标志性亮点，<br><em>令人心驰神往。</em>',
      atmosSub: '雅致的建筑与温暖的原声艺术浑然交织，只为您的舒适惬意。',
      atmosCard1Tag: '位于主厅',
      atmosCard1Title: '通顶酒墙与鸡尾酒吧',
      atmosCard1Desc: '玻璃与金属打造的酒墙直抵天花，陈列着数百款珍藏佳酿。中央吧台是调酒师们的舞台，以创意鸡尾酒礼赞岘港的海滨风情。',
      atmosCard2Tag: '门厅与吧台',
      atmosCard2Title: '每晚三角钢琴与原声吉他',
      atmosCard2Desc: '每晚 19:00 起，温暖的三角钢琴与原声吉他旋律在厅内流淌 — 它不是喧宾夺主的舞台表演，而是轻柔地为您的餐桌对话增添韵味。',
      eventsEyebrow: '— 私人活动',
      eventsTitle: '1,400m² 花园庄园，<em>为您的夜晚倾情编排。</em>',
      eventsDesc: '花园婚礼、生日庆典、企业晚宴与品牌发布会。玻璃花房可容纳 60 位宾客，露台 120 位，整座花园庄园最多 300 位。提供定制菜单、侍酒师配酒推荐与周到而低调的服务。',
      eventsZalo: '通过 Zalo 策划',
      eventsTel: '或致电 +84 708 888 007',
      visitEyebrow: '— 欢迎光临',
      visitTitle: '大门为您敞开。<br><em>来享一餐美味，留下一段难忘的夜晚。</em>',
      visitSub: '花园餐厅位于岘港美溪海滩陈白藤街 37 号。每日营业 07:30 至 00:00。',
      btnReserve: '预订餐位',
      btnZalo: 'Zalo 咨询',
      btnFacebook: '访问 Facebook',
      footerBrand: '美溪海滩畔的花园餐厅与原声音乐酒廊。',
      footerVisit: '地址',
      footerContact: '联系方式',
      footerFollow: '关注我们'
    },
    th: {
      lang: 'th',
      title: 'Casa Mika (คาซ่า มิกะ) — การ์เด้นไดนิ่ง ไวน์ & อะคูสติกเลานจ์ ริมหาดหมีเคว | ดานัง',
      metaDesc: 'Casa Mika ดานัง ร้านอาหารในสวนพื้นที่ 1,400 ตร.ม. ใกล้หาดหมีเคว อาหารร่วมสมัยผสานตะวันออกและตะวันตก ไวน์คัดสรร และดนตรีสดแกรนด์เปียโนและกีตาร์ทุกค่ำคืน',
      navAbout: 'เกี่ยวกับเรา',
      navMenu: 'เมนู',
      navNews: 'ข่าวสาร',
      navCareer: 'ร่วมงานกับเรา',
      navReserve: 'จองโต๊ะ',
      heroEyebrow: '— Casa Mika ดานัง',
      heroTitle: 'โอเอซิสสีเขียว<br>ริมหาดหมีเคว<br><em>ที่ซึ่งเวลา<br>หลีกทางให้ความรู้สึก</em>',
      heroSub: 'การ์เด้นไดนิ่งกว้างขวางกว่า 1,400 ตร.ม. ใจกลางดานัง — ผสานรสชาติร่วมสมัยแห่งตะวันออกและตะวันตก คอลเลกชันไวน์คัดสรร และท่วงทำนองอะคูสติกยามพลบค่ำ',
      heroBtnReserve: 'จองโต๊ะ',
      heroBtnMenu: 'ดูเมนู',
      storyEyebrow: '— เรื่องราวของเรา',
      storyTitle: 'บ้านที่อบอุ่นต้อนรับ<br><em>ท่ามกลางสวนเขตร้อน</em>',
      storyLede: 'Casa Mika ถือกำเนิดจากความรักอันลึกซึ้งที่มีต่อหาดหมีเคว และความหลงใหลในศิลปะการทำอาหารตลอดชีวิตของผู้ก่อตั้ง คุณเหงียน ถิ มิญ คั้ญ (Nguyễn Thị Minh Khánh) เธอใฝ่ฝันถึง “บ้าน” ที่แท้จริง — พื้นที่อบอุ่นที่เพื่อนฝูง ครอบครัว และนักเดินทางผู้พิถีพิถันได้มาล้อมวงร่วมกัน ด้วยรสชาติจริงใจและบทสนทนาที่น่าจดจำ',
      storyBody1: 'ตั้งอยู่ที่ 37 ถนนเจิ่นบั๊กดั่ง (Tran Bach Dang) เดินเพียงไม่กี่ก้าวก็ถึงหาดทรายสีทองของหมีเคว Casa Mika ทอดตัวบนพื้นที่สีเขียวกว้างขวางกว่า 1,400 ตร.ม. ทุกมุมได้รับการรังสรรค์อย่างใส่ใจ ทั้งกลาสเฮาส์ที่อาบแสงแดด เทอร์เรซกลางสวนที่มีลมพัดเย็นสบาย บาร์ร่วมสมัยหันหน้าสู่ผนังไวน์สูงจรดเพดาน และแกรนด์เปียโนอันสง่างามในโถงหลัก ทุกสิ่งถูกออกแบบมาเพื่อประสบการณ์การรับประทานอาหารที่ผ่อนคลาย ประณีต และอิ่มเอมใจ',
      storyBody2: 'ในภาษาสเปน <em>Casa</em> แปลว่าบ้าน ส่วน <em>Mika</em> คือชื่อเล่นแสนอบอุ่นที่เพื่อนสนิทตั้งให้คุณมิญ คั้ญ Casa Mika — บ้านของมิกะ — จึงพร้อมต้อนรับคุณให้ได้ชะลอจังหวะชีวิต แบ่งปันเสียงหัวเราะ และดื่มด่ำกับศิลปะแห่งการใช้ชีวิต',
      metaStat1Title: 'จุดหมายริมหาดหมีเคว',
      metaStat1Sub: '37 Tran Bach Dang, ดานัง',
      metaStat2Title: 'พื้นที่ 1,400 ตร.ม.',
      metaStat2Sub: 'สวน กลาสเฮาส์ บาร์ & โถงหลัก',
      metaStat3Title: 'เปิดทุกวัน',
      metaStat3Sub: 'ยินดีต้อนรับ 07:30 – 00:00 น.',
      quote1: 'เราไม่ได้เพียงเสิร์ฟอาหาร<br>แต่เราสร้างพื้นที่อันอบอุ่น<br><em>เพื่อเฉลิมฉลองทุกการพบกันอันล้ำค่า</em>',
      quote2: 'ปลีกตัวจากความวุ่นวายของเมือง<br>ที่ Casa Mika บทสนทนาจะยาวนานขึ้น<br><em>และทุกนาทีมีค่าให้ลิ้มรส</em>',
      reelsEyebrow: '— ช่วงเวลาแห่ง Casa Mika',
      reelsTitle: 'ชีวิตในสวน<br><em>ถ่ายทอดผ่านเฟรม 9:16</em>',
      reelsSub: 'สองมุมมองแบบภาพยนตร์ที่ถ่ายทอดบรรยากาศอันมีชีวิตชีวาและจังหวะชีวิตของ Casa Mika',
      reelsBadge1: 'สวน & บรรยากาศ',
      reelsBadge2: 'อาหาร & ไลฟ์สไตล์',
      valuesEyebrow: '— ปรัชญาของเรา',
      valuesTitle: 'สี่หลักแห่งการรังสรรค์อาหาร<br><em>ที่เรายึดมั่นทุกวัน</em>',
      valuesSub: 'ทุกจานและทุกแก้วที่ Casa Mika คือเครื่องยืนยันถึงความทุ่มเท มาตรฐานที่เข้มงวด และความรักในศาสตร์แห่งอาหารอย่างแท้จริง',
      v1Num: '01 / จังหวะ',
      v1Title: 'ดื่มด่ำอย่างไม่เร่งรีบ <em>ในจังหวะของคุณเอง</em>',
      v1Desc: 'การบริการของเราดำเนินไปอย่างกลมกลืนกับจังหวะธรรมชาติของโต๊ะคุณ เราใส่ใจทุกช่วงเวลาที่คุณได้นั่งพักผ่อน แบ่งปัน และเชื่อมสัมพันธ์',
      v2Num: '02 / วัตถุดิบ',
      v2Title: 'สดใหม่จากแหล่ง <em>เฉลิมฉลองทุกฤดูกาล</em>',
      v2Desc: 'ตั้งแต่อาหารทะเลสดใหม่จากชายฝั่งดานังในทุกเช้า ไปจนถึงสมุนไพรหอมกรุ่นจากสวนของเราเอง วัตถุดิบตามฤดูกาลชั้นเยี่ยมคือหัวใจแห่งการรังสรรค์อาหารของเรา',
      v3Num: '03 / ครัว',
      v3Title: 'ตะวันออกพบตะวันตก <em>ความลงตัวแบบร่วมสมัย</em>',
      v3Desc: 'เชฟของเราผสานเทคนิคการปรุงแบบยุโรปคลาสสิกเข้ากับมรดกแห่งรสชาติและกลิ่นหอมอันโดดเด่นของอาหารเวียดนาม รังสรรค์เมนูที่แปลกใหม่แต่อบอุ่นคุ้นเคย',
      v4Num: '04 / ความประณีต',
      v4Title: 'สัมผัสแห่งงานฝีมือ <em>ในทุกรายละเอียด</em>',
      v4Desc: 'ตั้งแต่การเขย่าอย่างแม่นยำของบาร์เทนเดอร์ เสียงฉ่าอันหอมกรุ่นของจานบาร์บีคิวซิกเนเจอร์ ไปจนถึงการตกแต่งจานอย่างละเมียด ทุกจานล้วนผ่านมือของผู้ที่ทุ่มเทให้กับงานฝีมือ',
      dayEyebrow: '— หนึ่งวันที่ Casa Mika',
      dayTitle: 'ทุกชั่วโมงของวัน<br><em>มีอารมณ์ที่แตกต่าง</em>',
      daySub: 'ตั้งแต่แสงแดดยามเช้าที่ลอดผ่านใบไม้เขียวขจี จนถึงแสงเทียนอันอบอุ่นยามค่ำ Casa Mika มอบพื้นที่อันเงียบสงบสำหรับทุกช่วงเวลา',
      dayMornName: 'ยามเช้า',
      dayMornDesc: 'แสงอ่อนละมุนลอดผ่านร่มไม้ เริ่มต้นวันใหม่ด้วยกาแฟอาร์ทิซาน เฝอเนื้อซิกเนเจอร์หอมกรุ่น หรืออาหารเช้า Casa Mika แสนอิ่มอร่อย',
      dayNoonName: 'ยามกลางวัน',
      dayNoonDesc: 'อิ่มอร่อยกับมื้อกลางวันใต้ร่มไม้เย็นสบายหรือในกลาสเฮาส์ ลิ้มลองเนื้อสันในลุคลักแสนนุ่ม หรือยำไหลบัวซีฟู้ดกรุบกรอบร่วมกับเพื่อนร่วมงานและคนสนิท',
      dayAftName: 'ยามบ่าย',
      dayAftDesc: 'ช่วงเวลาแสนงามสำหรับการพักใจหรือพูดคุยอย่างผ่อนคลาย จิบม็อกเทล “ซันเซ็ต โอเวอร์ หมีเคว” เย็นชื่นใจ ขณะที่สายลมทะเลพัดผ่านเทอร์เรซ',
      dayEveName: 'ยามค่ำ',
      dayEveDesc: 'แสงเทียนเริ่มส่องประกาย ดื่มด่ำกับจานรวมบาร์บีคิวซิกเนเจอร์ กุ้งมังกรซอสไข่เค็มรสเข้มข้น และไวน์ชั้นเลิศ คลอเคล้าด้วยเสียงแกรนด์เปียโนและกีตาร์สด',
      showcaseEyebrow: '— เมนูคัดสรร',
      showcaseTitle: 'รสชาติซิกเนเจอร์<br><em>คัดสรรมาเพื่อโต๊ะของคุณ</em>',
      showcaseSub: 'ตั้งแต่อาหารทะเลสดจากตลาดยามเช้า ไปจนถึงเครื่องดื่มรังสรรค์ยามพลบค่ำ ทุกเมนูบอกเล่าเรื่องราวแห่งความหลงใหล',
      tabAll: 'แนะนำ',
      tabFood: 'อาหาร',
      tabDrink: 'กาแฟ & เครื่องดื่ม',
      tabMocktail: 'ม็อกเทล & ค็อกเทล',
      viewFullMenuBtn: 'ดูเมนูทั้งหมดแบบอินเทอร์แอคทีฟ',
      atmosEyebrow: '— พื้นที่ & ประสบการณ์',
      atmosTitle: 'สองไฮไลต์ซิกเนเจอร์<br><em>ที่ตราตรึงทุกประสาทสัมผัส</em>',
      atmosSub: 'สถาปัตยกรรมอันประณีตและศิลปะดนตรีอะคูสติกอันอบอุ่น ผสานกันอย่างลงตัวเพื่อความรื่นรมย์ของคุณ',
      atmosCard1Tag: 'ในโถงหลัก',
      atmosCard1Title: 'ผนังไวน์สูงจรดเพดาน & ค็อกเทลบาร์',
      atmosCard1Desc: 'ตู้ไวน์กระจกและโลหะสูงตระหง่านจรดเพดาน จัดแสดงไวน์ชั้นเลิศนับร้อยขวด บาร์กลางห้องคือที่ที่มิกโซโลจิสต์ของเรารังสรรค์ค็อกเทลที่ได้แรงบันดาลใจจากเสน่ห์ริมทะเลของดานัง',
      atmosCard2Tag: 'จากโถงต้อนรับ & บาร์',
      atmosCard2Title: 'ทุกค่ำคืน แกรนด์เปียโน & กีตาร์อะคูสติก',
      atmosCard2Desc: 'ตั้งแต่ 19:00 น. ทุกคืน ท่วงทำนองแกรนด์เปียโนและกีตาร์อะคูสติกอันอบอุ่นจะล่องลอยไปทั่วโถง — ไม่ใช่การแสดงบนเวทีที่กลบทุกสิ่ง แต่เพื่อเติมเต็มบทสนทนาบนโต๊ะของคุณอย่างนุ่มนวล',
      eventsEyebrow: '— งานส่วนตัว',
      eventsTitle: 'สวนกว้าง 1,400 ตร.ม. <em>รังสรรค์เพื่อค่ำคืนของคุณ</em>',
      eventsDesc: 'งานแต่งงานในสวน วันเกิดสำคัญ งานเลี้ยงองค์กร และงานเปิดตัวแบรนด์ กลาสเฮาส์รองรับ 60 ท่าน เทอร์เรซ 120 ท่าน และพื้นที่สวนทั้งหมดได้สูงสุด 300 ท่าน พร้อมเมนูออกแบบเฉพาะ คำแนะนำจากซอมเมอลิเยร์ และการบริการที่ใส่ใจทุกรายละเอียด',
      eventsZalo: 'วางแผนผ่าน Zalo',
      eventsTel: 'หรือโทร +84 708 888 007',
      visitEyebrow: '— มาเยือนเรา',
      visitTitle: 'ประตูเปิดรอคุณเสมอ<br><em>แวะมาทานมื้อพิเศษ แล้วอยู่ต่อเพื่อค่ำคืนที่น่าจดจำ</em>',
      visitSub: 'การ์เด้นไดนิ่งที่ 37 Tran Bach Dang หาดหมีเคว ดานัง เปิดทุกวัน 07:30 – 00:00 น.',
      btnReserve: 'จองโต๊ะ',
      btnZalo: 'ทักผ่าน Zalo',
      btnFacebook: 'เยี่ยมชม Facebook',
      footerBrand: 'การ์เด้นไดนิ่ง & อะคูสติกเลานจ์ ริมหาดหมีเคว',
      footerVisit: 'ที่ตั้ง',
      footerContact: 'ติดต่อ',
      footerFollow: 'ติดตาม'
    },
    ru: {
      lang: 'ru',
      title: 'Casa Mika — ресторан в саду, винный бар и акустический лаунж | Дананг',
      metaDesc: 'Ресторан-сад площадью 1400 м² у пляжа Ми Кхе в Дананге. Современная кухня на стыке Востока и Запада, авторская винная карта и живая музыка — рояль и гитара каждый вечер.',
      navAbout: 'О нас',
      navMenu: 'Меню',
      navNews: 'Новости',
      navCareer: 'Вакансии',
      navReserve: 'Бронь',
      heroEyebrow: '— Casa Mika Дананг',
      heroTitle: 'Зелёный оазис<br>у пляжа Ми Кхе,<br><em>где время уступает<br>место чувствам.</em>',
      heroSub: 'Ресторан-сад площадью 1400 м² в Дананге: современная кухня на стыке Востока и Запада, тщательно подобранная винная коллекция и акустические мелодии на закате.',
      heroBtnReserve: 'Забронировать стол',
      heroBtnMenu: 'Смотреть меню',
      storyEyebrow: '— Наша история',
      storyTitle: 'Гостеприимный дом<br><em>в тропическом саду.</em>',
      storyLede: 'Casa Mika родилась из глубокой любви основательницы Нгуен Тхи Минь Кхань (Nguyễn Thị Minh Khánh) к пляжу Ми Кхе и её давней страсти к кулинарному искусству. Она мечтала о настоящем доме — уютном месте, где друзья, семьи и взыскательные путешественники собираются за честной едой и незабываемыми разговорами.',
      storyBody1: 'Всего в нескольких шагах от золотого песка Ми Кхе, на улице Чан Бать Данг, 37, раскинулся зелёный уголок Casa Mika площадью 1400 м². Каждая деталь продумана с любовью: залитая солнцем оранжерея, обдуваемая бризом садовая терраса, современный бар напротив винной стены от пола до потолка и изящный рояль в главном зале. Всё здесь создано для неспешных, утончённых и душевных трапез.',
      storyBody2: 'По-испански <em>Casa</em> означает «дом», а <em>Mika</em> — ласковое прозвище, которое Минь Кхань дали близкие друзья. Casa Mika — «Дом Мики» — тепло приглашает вас замедлиться, разделить смех и насладиться искусством жить.',
      metaStat1Title: 'У пляжа Ми Кхе',
      metaStat1Sub: 'ул. Чан Бать Данг, 37, Дананг',
      metaStat2Title: 'Пространство 1400 м²',
      metaStat2Sub: 'Сад, оранжерея, бар и главный зал',
      metaStat3Title: 'Открыто ежедневно',
      metaStat3Sub: 'Ждём гостей с 07:30 до 00:00',
      quote1: 'Мы не просто подаём блюда.<br>Мы создаём гостеприимное пространство,<br><em>где празднуют самые тёплые встречи.</em>',
      quote2: 'Оставьте городскую суету позади.<br>В Casa Mika беседы длятся дольше,<br><em>а время хочется смаковать.</em>',
      reelsEyebrow: '— Моменты Casa Mika',
      reelsTitle: 'Жизнь в саду<br><em>в формате 9:16.</em>',
      reelsSub: 'Два ярких кинематографичных взгляда на атмосферу и живой ритм Casa Mika.',
      reelsBadge1: 'Сад и атмосфера',
      reelsBadge2: 'Кухня и стиль жизни',
      valuesEyebrow: '— Наша философия',
      valuesTitle: 'Четыре кулинарных принципа,<br><em>которым мы верны каждый день.</em>',
      valuesSub: 'Каждое блюдо и каждый напиток в Casa Mika — это вдумчивая работа, строгие стандарты и искренняя любовь к гастрономии.',
      v1Num: '01 / Ритм',
      v1Title: 'Ужин без спешки, <em>в вашем темпе.</em>',
      v1Desc: 'Сервис подстраивается под естественный ритм вашего стола. Мы ценим каждое мгновение, которое вы проводите в неспешной беседе с близкими.',
      v2Num: '02 / Продукты',
      v2Title: 'Свежесть из первых рук, <em>в ритме сезонов.</em>',
      v2Desc: 'От утреннего улова у берегов Дананга до ароматных трав из нашего сада — отборные сезонные продукты лежат в основе нашей кухни.',
      v3Num: '03 / Кухня',
      v3Title: 'Восток встречает Запад, <em>в современной гармонии.</em>',
      v3Desc: 'Наши шеф-повара сочетают классические европейские техники с яркой ароматной традицией вьетнамской кухни, создавая блюда новаторские и при этом по-домашнему уютные.',
      v4Num: '04 / Мастерство',
      v4Title: 'Ручная работа <em>в каждой детали.</em>',
      v4Desc: 'От точного движения шейкера в руках бармена до шипения фирменного гриль-сета и тонкой подачи — каждую тарелку создают руки, преданные своему делу.',
      dayEyebrow: '— День в Casa Mika',
      dayTitle: 'Каждый час дня —<br><em>особое настроение.</em>',
      daySub: 'От утреннего солнца сквозь листву до тёплого вечернего света свечей — Casa Mika дарит умиротворённое пространство для любого момента.',
      dayMornName: 'Утро',
      dayMornDesc: 'Мягкие лучи пробиваются сквозь кроны деревьев. Начните утро с авторского кофе, ароматного фирменного фо бо или сытного завтрака Casa Mika.',
      dayNoonName: 'Полдень',
      dayNoonDesc: 'Насладитесь обедом в тени деревьев или в оранжерее: нежная говяжья вырезка бо лук лак или хрустящий салат из стеблей лотоса с морепродуктами — в компании коллег и друзей.',
      dayAftName: 'После обеда',
      dayAftDesc: 'Идеальное время для тихих размышлений или неспешной беседы. Освежитесь охлаждённым моктейлем Sunset Over My Khe, пока морской бриз гуляет по террасе.',
      dayEveName: 'Вечер',
      dayEveDesc: 'Зажигаются свечи. Побалуйте себя фирменным гриль-ассорти, изысканным лобстером в соусе из солёного яйца и благородными винами под живые мелодии рояля и гитары.',
      showcaseEyebrow: '— Избранное',
      showcaseTitle: 'Фирменные вкусы,<br><em>подобранные для вашего стола.</em>',
      showcaseSub: 'От морепродуктов с утреннего рынка до авторских напитков на закате — за каждым творением стоит история и страсть.',
      tabAll: 'Избранное',
      tabFood: 'Кухня',
      tabDrink: 'Кофе и напитки',
      tabMocktail: 'Моктейли и коктейли',
      viewFullMenuBtn: 'Открыть полное интерактивное меню',
      atmosEyebrow: '— Пространство и впечатления',
      atmosTitle: 'Две особенности,<br><em>которые пленяют чувства.</em>',
      atmosSub: 'Изысканная архитектура и тёплая акустическая музыка, гармонично сплетённые ради вашего комфорта.',
      atmosCard1Tag: 'В главном зале',
      atmosCard1Title: 'Винная стена до потолка и коктейль-бар',
      atmosCard1Desc: 'Эффектная винная витрина из стекла и металла поднимается до самого потолка и хранит сотни благородных вин. За центральной барной стойкой наши миксологи создают коктейли, вдохновлённые прибрежным Данангом.',
      atmosCard2Tag: 'Из фойе и бара',
      atmosCard2Title: 'Каждый вечер — рояль и акустическая гитара',
      atmosCard2Desc: 'Ежедневно с 19:00 по залу льются тёплые мелодии рояля и акустической гитары — не громкое сценическое шоу, а деликатное сопровождение, которое делает беседу за вашим столом ещё приятнее.',
      eventsEyebrow: '— Частные мероприятия',
      eventsTitle: '1400 м² сада, <em>созданные для вашего вечера.</em>',
      eventsDesc: 'Свадьбы в саду, юбилеи, корпоративные ужины и презентации брендов. Оранжерея — до 60 гостей, терраса — до 120, весь сад — до 300 гостей. Индивидуальное меню, рекомендации сомелье и деликатный сервис.',
      eventsZalo: 'Обсудить в Zalo',
      eventsTel: 'или звоните +84 708 888 007',
      visitEyebrow: '— Ждём вас',
      visitTitle: 'Двери открыты.<br><em>Приходите поужинать — и останьтесь на незабываемый вечер.</em>',
      visitSub: 'Ресторан-сад на ул. Чан Бать Данг, 37, у пляжа Ми Кхе, Дананг. Открыто ежедневно с 07:30 до 00:00.',
      btnReserve: 'Забронировать стол',
      btnZalo: 'Написать в Zalo',
      btnFacebook: 'Мы в Facebook',
      footerBrand: 'Ресторан-сад и акустический лаунж у пляжа Ми Кхе.',
      footerVisit: 'Адрес',
      footerContact: 'Контакты',
      footerFollow: 'Соцсети'
    }
  }[lang];

  let showcaseCardsHtml = showcaseItems.map(item => {
    const name = localizedName(item, lang);
    const badge = item.badges[lang] || item.badges.en;
    const isHiddenInitially = !item.isFeatured;
    return `
            <article class="ms-dish-card fade-up${item.isFeatured ? ' visible' : ''}" data-category="${item.cat}" data-featured="${item.isFeatured ? 'true' : 'false'}"${isHiddenInitially ? ' style="display: none;"' : ''}>
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
<html lang="${LANGS[lang].htmlLang}">

<head>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PD796LGB');</script>
    <!-- End Google Tag Manager -->

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#1A1410">
    <script src="/gate.js"></script>
    <script>try { localStorage.setItem('mika-lang', '${t.lang}'); } catch (e) { }</script>
    <meta name="description" content="${t.metaDesc}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Open Graph / Facebook / Zalo -->
    <meta property="og:type" content="restaurant">
    <meta property="og:site_name" content="Casa Mika">
    <meta property="og:locale" content="${LANGS[lang].locale}">
    <meta property="og:url" content="https://casamika.com/${t.lang}/">
    <meta property="og:title" content="${t.title}">
    <meta property="og:description" content="${t.metaDesc}">
    <meta property="og:image" content="https://casamika.com/image/imagenhahang.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Casa Mika — Garden Dining, Fine Wine & Acoustic Lounge">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${t.title}">
    <meta name="twitter:description" content="${t.metaDesc}">
    <meta name="twitter:image" content="https://casamika.com/image/imagenhahang.jpg">

    <title>${t.title}</title>

    <link rel="icon" type="image/png" href="/image/logo/logo-new.png">
    <link rel="apple-touch-icon" href="/image/logo/logo-new.png">
    <link rel="canonical" href="https://casamika.com/${t.lang}/">
    ${hreflangLinks('')}

    <!-- Schema.org JSON-LD: Restaurant & LocalBusiness -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": ["Restaurant", "BarOrPub"],
      "@id": "https://casamika.com/#restaurant",
      "name": "Casa Mika",
      "alternateName": ["Casa Mika Da Nang", "Casa Mika Garden Dining & Lounge", "Nhà hàng Casa Mika"],
      "image": [
        "https://casamika.com/image/imagenhahang.jpg",
        "https://casamika.com/image/logo/logo-new.png"
      ],
      "url": "https://casamika.com/${t.lang}/",
      "telephone": "+84708888007",
      "email": "info@casamika.com",
      "priceRange": "$$ - $$$",
      "servesCuisine": [
        "Vietnamese",
        "European",
        "Contemporary",
        "Seafood",
        "Wine Bar",
        "Cocktails"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "37 Trần Bạch Đằng, Phường Mỹ An",
        "addressLocality": "Ngũ Hành Sơn",
        "addressRegion": "Đà Nẵng",
        "postalCode": "550000",
        "addressCountry": "VN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 16.0497664,
        "longitude": 108.24709075
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:30",
          "closes": "00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "07:30",
          "closes": "00:30"
        }
      ],
      "acceptsReservations": "True",
      "hasMenu": "https://casamika.com/${t.lang}/menu/",
      "sameAs": [
        "https://www.facebook.com/official.casamika",
        "https://www.instagram.com/casamika.official/",
        "https://zalo.me/0708888007"
      ]
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
    <link rel="preload" as="image" href="/image/imagenhahang.jpg">
    <link rel="stylesheet" href="/style.css">
</head>

<body class="site-main">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PD796LGB"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

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
            ${langSwitcher(lang, '')}
            <button class="ms-nav-toggle" id="msNavToggle" aria-label="Menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- ===== Hero Header (About ở đầu trang) ===== -->
    <header class="ms-hero ms-about-hero" id="hero">
        <div class="ms-hero-bg">
            <img src="/image/imagenhahang.jpg" alt="" class="ms-hero-image" aria-hidden="true">
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
                    <div class="ms-reel-loading"></div>
                    <video class="ms-reel-video" src="/video/video-highlight-1.mp4" playsinline webkit-playsinline loop muted preload="metadata" poster="/image/reel-poster-1.webp"></video>
                    <button type="button" class="ms-reel-play-btn" aria-label="Play Video">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
                    </button>
                    <button type="button" class="ms-reel-sound-btn" aria-label="Sound Toggle">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                    </button>
                </div>
                <!-- Reel Video 2 -->
                <div class="ms-reel-card fade-up delay-1">
                    <span class="ms-reel-badge">${t.reelsBadge2}</span>
                    <div class="ms-reel-loading"></div>
                    <video class="ms-reel-video" src="/video/video-highlight-2.mp4" playsinline webkit-playsinline loop muted preload="metadata" poster="/image/reel-poster-2.webp"></video>
                    <button type="button" class="ms-reel-play-btn" aria-label="Play Video">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
                    </button>
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

  fs.mkdirSync(path.join(__dirname, lang), { recursive: true });
  fs.writeFileSync(path.join(__dirname, lang, 'index.html'), html, 'utf8');
  console.log(`Generated homepage for ${lang}/index.html successfully!`);
}

LANG_CODES.forEach(buildHomepage);
