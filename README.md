# Маяк — расписание служб

Статическая страница храма Рождества Христова с расписанием на октябрь 2026 года. HTML, CSS и JavaScript разделены; сборка и установка зависимостей не нужны.

## Поведение

- Луч маяка загорается слева, проходит видимую дугу через нижнюю часть сцены направо и за 6,4 секунды останавливается на стороне расписания. Только после остановки луча расписание плавно проявляется. Появление связано с завершением CSS-анимации, а не с отдельным таймером.
- Анимация начинается после загрузки изображения маяка в видимой вкладке; при переключении на другую вкладку движение приостанавливается. Кнопка «Повторить движение маяка» запускает его заново без перезагрузки страницы.
- Наведение мыши на карточку на 420 мс открывает изображение с плавным увеличением на всё окно браузера.
- Нажатие и клавиша Enter также открывают расписание. На телефоне используйте касание.
- Крестик, Esc и нажатие на свободное пространство закрывают просмотр.
- «Крупнее» открывает увеличенное изображение с прокруткой; «Целиком» возвращает его в размер окна.
- В системном режиме уменьшения движения анимации отключены.
- Под изображением доступна текстовая версия всех служб. Без JavaScript карточка открывает оригинальный PNG.

Полноэкранный просмотр заполняет окно браузера. Панели самого браузера остаются видимыми: переход в системный Fullscreen API при наведении запрещён браузерами без пользовательского нажатия.

## Структура

```text
index.html
.nojekyll
assets/
  css/styles.css
  js/main.js
  img/lighthouse.webp
  img/october-2026.webp
  img/october-2026.png
  img/favicon.svg
  fonts/.gitkeep
```

## GitHub Pages

В Settings → Pages выберите Deploy from a branch, ветку main и папку / (root). Ожидаемый адрес этой конфигурации: https://maksimas-win.github.io/lighthouse-schedule/.

Для Hostinger перенесите содержимое репозитория в public_html или нужную подпапку. При смене адреса обновите canonical, og:url и og:image в index.html. Все ссылки на ресурсы относительные, поэтому страница работает и в подпапке.

## Локальный просмотр

Откройте index.html или запустите в папке сайта `python -m http.server 4173` и откройте http://localhost:4173.

## Следующий месяц

Добавьте новую афишу в assets/img/, обновите ссылки на неё, подписи, даты и текстовую таблицу в index.html. PNG хранит предоставленный оригинал; WebP используется для быстрой загрузки. Изображения расписания и маяка вместе занимают около 480 КиБ в формате WebP.

## Безопасность и доступность

Страница не использует внешние зависимости, запросы, cookie, аналитику, inline-скрипты, inline-стили и innerHTML. CSP в HTML разрешает только локальные изображения, стили, скрипты и шрифты. Просмотр реализован через native dialog с ограничением фокуса и его возвратом после закрытия. Анимация изображения использует Web Animations API из внешнего JS-файла.

## Изображения

Афиша предоставлена пользователем и сохранена без изменения содержимого. Маяк создан встроенным imagegen; конечный файл — assets/img/lighthouse.webp. Использованный запрос:

> Use case: stylized-concept. Asset type: isolated photorealistic lighthouse for an interactive website. Create one tall classic tapered lighthouse with ivory-white masonry, one wide black horizontal band around its middle, dark metal balcony and lantern room, small warm glowing lamp inside, conical dark roof and thin spire. Black void background RGB 0,0,0. Full tower visible including base. Front three-quarter view, elegant realistic weathered stone and metal textures, dramatic subtle warm light on right side, soft rim light. Composition: portrait 1024x1536, tower centered horizontally, roof tip at 8% image height, central lamp at about 24% image height, tower base at 96% image height. Tower occupies about 42% image width, considerable pure black margin on both sides. No landscape, no ocean, no rocks, no sky, no text, no watermark, no light beam: the beam will be animated separately in CSS. Standalone production web asset, cinematic detail, restrained golden lighting.
