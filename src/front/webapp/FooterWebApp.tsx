import { mainBackgroundColor, textColorSecondary } from '@/styles/mixins'; // Импорт палитры

export const FooterWebApp = () => {
  return (
    <footer
      style={{
        padding: '16px',
        background: mainBackgroundColor,
        borderTop: `1px solid ${textColorSecondary}`,
        marginTop: 'auto',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '1rem',
          color: textColorSecondary,
        }}
      >
        © 2025 WebApp. Все права защищены.
      </p>
    </footer>
  );
};
// Комментарий: теперь все цвета берутся из palette, вы легко сможете их менять централизованно.
