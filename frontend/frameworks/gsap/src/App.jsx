import { onMount, createSignal } from 'solid-js';
import styles from './App.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from './logo.svg';

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

function App() {
  let sectionsRef;
  let headerRef;
  
  onMount(() => {
    // 初始化动画
    gsap.to(headerRef, {
      scrollTrigger: {
        trigger: headerRef,
        start: 'top top',
        end: '+=100%',
        scrub: true,
      },
      scale: 0.8,
      opacity: 0,
    });

    // 为每个section创建动画
    const sections = document.querySelectorAll(`.${styles.section}`);
    sections.forEach((section, index) => {
      // 文字动画
      gsap.from(section.querySelector(`.${styles.sectionContent}`), {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });
      
      // 图片动画
      const img = section.querySelector(`.${styles.sectionImage}`);
      if (img) {
        gsap.from(img, {
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
          scale: 0.8,
          opacity: 0,
        });
      }
    });
  });

  return (
    <div class={styles.App}>
      {/* 英雄区块 */}
      <header ref={headerRef} class={styles.hero}>
        <img src={logo} class={styles.heroLogo} alt="Solid Logo" />
        <h1 class={styles.heroTitle}>Solid JS</h1>
        <p class={styles.heroSubtitle}>简单、高效的响应式 UI 框架</p>
        <div class={styles.scrollIndicator}>
          向下滚动了解更多
          <div class={styles.scrollArrow}></div>
        </div>
      </header>

      {/* 内容区块 */}
      <div ref={sectionsRef} class={styles.sections}>
        <section class={styles.section}>
          <div class={styles.sectionContent}>
            <h2>极致性能</h2>
            <p>通过细粒度更新和编译时优化，实现超快的渲染速度</p>
          </div>
          <div class={styles.sectionImage}>
            <div class={styles.performanceGraph}></div>
          </div>
        </section>

        <section class={`${styles.section} ${styles.reverse}`}>
          <div class={styles.sectionContent}>
            <h2>简洁的响应式</h2>
            <p>告别复杂的状态管理，拥抱直观的响应式编程</p>
          </div>
          <div class={styles.sectionImage}>
            <div class={styles.codeBlock}>
              <pre>
                <code>
                  {`const [count, setCount] = createSignal(0);
const double = createMemo(() => count() * 2);`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section class={styles.section}>
          <div class={styles.sectionContent}>
            <h2>JSX + 响应式</h2>
            <p>熟悉的语法，强大的响应式系统</p>
          </div>
          <div class={styles.sectionImage}>
            <div class={styles.jsxDemo}></div>
          </div>
        </section>
      </div>

      {/* 行动召唤区 */}
      <section class={styles.cta}>
        <h2>准备好开始了吗？</h2>
        <div class={styles.ctaButtons}>
          <a href="https://www.solidjs.com/docs/latest" class={styles.primaryBtn}>
            开始使用
          </a>
          <a href="https://github.com/solidjs/solid" class={styles.secondaryBtn}>
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
