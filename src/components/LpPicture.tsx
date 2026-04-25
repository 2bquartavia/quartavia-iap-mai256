import type { CSSProperties, ImgHTMLAttributes } from "react";

const BASE = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/images-lp`;

const WIDTHS = [480, 800, 1280] as const;

function buildSrcSet(stem: string, ext: "avif" | "webp" | "jpg", onlyW?: number) {
  if (onlyW) {
    return `${BASE}/${stem}-${onlyW}.${ext} ${onlyW}w`;
  }
  return WIDTHS.map((w) => `${BASE}/${stem}-${w}.${ext} ${w}w`).join(", ");
}

type LpPictureProps = {
  /** ex.: "adrian-esposa" (ficheiro em /public/images-lp/) */
  stem: string;
  alt: string;
  sizes: string;
  width: number;
  height: number;
  /** classes no <picture> (ex.: `absolute inset-0 block` para encher um painel) */
  frameClassName?: string;
  className?: string;
  style?: CSSProperties;
  /** hero / above-fold */
  priority?: boolean;
  /** blur decorativo: não precisa de lazy agressivo */
  blurBackground?: boolean;
  /** uma só largura (ex.: 480) para fundo muito desfocado — menos bytes */
  singleWidth?: 480 | 800 | 1280;
} & Pick<ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "decoding" | "aria-hidden">;

/**
 * AVIF + WebP + JPEG com srcset; ficheiros gerados por `npm run optimize:images`.
 */
export default function LpPicture({
  stem,
  alt,
  sizes,
  width,
  height,
  frameClassName = "block",
  className,
  style,
  priority = false,
  blurBackground = false,
  singleWidth,
  decoding: decodingProp,
  "aria-hidden": ariaHidden,
  ...rest
}: LpPictureProps) {
  const w = singleWidth;
  const avif = buildSrcSet(stem, "avif", w);
  const webp = buildSrcSet(stem, "webp", w);
  const jpg = buildSrcSet(stem, "jpg", w);
  const fallbackJpg = w ? `${BASE}/${stem}-${w}.jpg` : `${BASE}/${stem}-800.jpg`;
  const loading = priority || blurBackground ? "eager" : "lazy";
  const fetchPriority = priority && !blurBackground ? "high" : "low";
  const decoding = decodingProp ?? (priority ? "sync" : "async");

  return (
    <picture className={frameClassName}>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img
        src={fallbackJpg}
        srcSet={w ? jpg : buildSrcSet(stem, "jpg")}
        sizes={sizes}
        width={width}
        height={height}
        className={className}
        style={style}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        aria-hidden={ariaHidden}
        {...rest}
      />
    </picture>
  );
}
