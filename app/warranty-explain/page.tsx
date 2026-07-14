import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "保固註冊操作說明 | Saiens",
  robots: {
    index: false,
    follow: false,
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-(family-name:--font-jost) text-sm uppercase tracking-[0.18em] text-(--dark-accent)">
      {children}
    </p>
  );
}

function SectionTitle({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <h2 className="border-t border-(--accent) pt-8 text-2xl tracking-tight">
      <span className="mr-3 font-(family-name:--font-jost) text-base text-(--dark-accent)">{no}</span>
      {children}
    </h2>
  );
}

function SituationCard({
  situation,
  see,
  action,
}: {
  situation: string;
  see: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border border-(--accent) p-5">
      <p className="font-semibold">{situation}</p>
      <p className="text-sm text-(--dark-accent)">
        <span className="font-semibold">你會看到：</span>
        {see}
      </p>
      <p className="text-sm text-(--dark-accent)">
        <span className="font-semibold">你要做：</span>
        {action}
      </p>
    </div>
  );
}

export default function WarrantyExplainPage() {
  return (
    <main className="flex flex-1 flex-col bg-(--white) text-(--black)">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16 md:py-24">
        {/* 標題 */}
        <div className="flex flex-col gap-3 border-b border-(--accent) pb-8">
          <Eyebrow>Saiens Internal — 客服・業務教育訓練</Eyebrow>
          <h1 className="text-3xl tracking-tight md:text-4xl">保固註冊操作說明</h1>
          <p className="leading-relaxed text-(--dark-accent)">
            業主完成保固註冊，我們才真正跟「使用產品的人」建立了聯繫——之後的保固與售後服務才找得到人。
            這頁教你（客服與業務）在這個流程裡各自要做什麼。目標很簡單：
            <strong className="text-(--black)">每一個完工案件的業主，都完成註冊。</strong>
          </p>
        </div>

        {/* 一、流程總覽 */}
        <div className="flex flex-col gap-4">
          <SectionTitle no="01">整個流程 30 秒看懂</SectionTitle>
          <div className="overflow-x-auto">
            <pre className="border border-(--accent) bg-(--white) p-5 font-mono text-[13px] leading-7 text-(--black)">
{`業務完成驗收簽名
    │ 系統自動
    ▼
保固註冊連結產生（不用選年限、不用按任何鈕）
    │ 業務把連結傳給設計師 → 設計師轉給業主（或代填）
    ▼
業主開連結 → 填姓名／電話／Email → 送出
    │ 系統自動
    ▼
CRM 變「已註冊」＋ 客服收到通知信 ＋ 業主被引導加入客服 LINE`}
            </pre>
          </div>
          <p className="text-sm leading-relaxed text-(--dark-accent)">
            人要做的只有中間那一步：<strong className="text-(--black)">把連結傳出去</strong>。其他都是系統自動的。
          </p>
        </div>

        {/* 二、業務篇 */}
        <div className="flex flex-col gap-5">
          <SectionTitle no="02">業務（AM）：你只要做一件事</SectionTitle>
          <p className="leading-relaxed">
            <strong>把保固註冊連結傳給設計師。</strong>就這樣，沒有別的。
          </p>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">連結去哪裡拿（兩個地方都有，挑順手的）</h3>
            <ol className="flex list-decimal flex-col gap-2 pl-6 text-sm leading-relaxed">
              <li>
                <strong>驗收詳情頁</strong>（line.saiens.tw）：你簽完驗收的當下，頁面上就會出現「保固註冊連結」區塊，按
                <strong>「複製」</strong>即可
              </li>
              <li>
                <strong>CRM 案件</strong>（quote.saiens.tw）：打開案件，右側訊息紀錄有一則「已產生保固註冊連結」，連結可以直接點、直接複製
              </li>
            </ol>
            <p className="text-sm text-(--dark-accent)">
              同時你的待辦清單會出現「保固連結已產生，請轉交設計師」提醒你這件事。傳出去之後，把待辦打勾完成。
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">傳給設計師的訊息範本（直接複製改案名）</h3>
            <blockquote className="border-l-2 border-(--accent) py-1 pl-4 text-sm leading-relaxed text-(--dark-accent)">
              「這是 ○○ 案的保固註冊連結，麻煩轉給業主填寫（您代填也可以，表單裡勾選『設計師代填』即可）。
              填完保固就正式生效，之後保固相關由 Saiens 直接服務業主，不用再麻煩您轉達。」
            </blockquote>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">唯一需要手動的情況</h3>
            <p className="text-sm leading-relaxed">
              連結超過 30 天沒被填寫會過期。這時打開 CRM 案件 → 下方「保固註冊」頁籤 → 按
              <strong>「產生保固連結」</strong>一次即可——
              <strong>連結網址不變、效期重新起算</strong>，之前傳給設計師的那條連結會直接復活，不用重傳。
            </p>
            <p className="text-sm leading-relaxed text-(--dark-accent)">
              注意：<strong className="text-(--black)">保固年限不用選、也不要等年限</strong>
              ——年限之後會依完工日期由公司判定，跟註冊無關。看到年限欄位是空的，直接按按鈕就對了。
            </p>
          </div>

          <div className="border border-(--accent) bg-(--white) p-4 text-sm leading-relaxed">
            <strong>你的成功標準：</strong>每一個你簽完驗收的案件，業主都完成註冊。CRM 案件的「保固註冊」頁籤顯示
            <strong>「已註冊」</strong>就是完成；停在「已發連結」超過一週，主動追一下設計師。
          </div>
        </div>

        {/* 三、客服篇 */}
        <div className="flex flex-col gap-5">
          <SectionTitle no="03">客服：你會遇到的五種情況</SectionTitle>

          <div className="flex flex-col gap-4">
            <SituationCard
              situation="① 有業主完成註冊"
              see="service@saiens.tw 收到主旨「[保固註冊] 新登記」的信，內含業主姓名、電話、Email、是否為設計師代填"
              action="不需回覆也可以；若是重要案件，可回覆該信向業主致意（回覆會直接寄到業主信箱）。資料已自動進 CRM，不用手動登打。"
            />
            <SituationCard
              situation="② 業主來電／來訊問保固狀態"
              see="業主報上姓名或案場地址"
              action={
                <>
                  到 quote.saiens.tw → CRM 搜尋案件 → 打開案件下方<strong>「保固註冊」頁籤</strong>
                  ，狀態、登記人、登記時間都在這裡。
                </>
              }
            />
            <SituationCard
              situation="③ 業主說註冊資料填錯了要改"
              see="業主無法自己重填（系統防止重複送出，避免資料被覆寫）"
              action={
                <>
                  由你在 CRM「保固註冊」頁籤<strong>直接修改欄位</strong>
                  ，並在案件訊息紀錄留言註記修改原因（例：業主來電更正電話號碼）。
                </>
              }
            />
            <SituationCard
              situation="④ 業主加入了客服 LINE"
              see="LINE 官方帳號出現新好友或新訊息"
              action="照一般客服流程對話即可。之後系統升級會自動綁定業主與案件，現階段請業主提供案場地址即可在 CRM 找到對應案件。"
            />
            <SituationCard
              situation="⑤ 收到其他官網表單通知"
              see="主旨「[官網表單] mobius／saiens-salon／taipeibex…」的信"
              action="這是官網各活動頁的聯絡表單（不是保固），照各活動的窗口流程分派處理。"
            />
          </div>
        </div>

        {/* 四、業主端 */}
        <div className="flex flex-col gap-4">
          <SectionTitle no="04">業主那邊長什麼樣（被問到時你答得出來）</SectionTitle>
          <ul className="flex list-disc flex-col gap-2 pl-6 text-sm leading-relaxed">
            <li>
              業主打開連結會看到<strong>案場地址（系統帶出，不用填）</strong>，只需填三個欄位：
              <strong>姓名、電話、Email</strong>
            </li>
            <li>
              設計師代業主填寫時，勾選「我是設計師，代業主填寫」並填代填人姓名即可，系統會留下代填紀錄
            </li>
            <li>送出後會看到完成頁，上面有「加入 Saiens 客服 LINE」按鈕和 QR code；業主信箱也會收到確認信</li>
            <li>
              <strong>連結過期或無效</strong>：業主會看到「請聯繫您的設計師或 Saiens 業務重新取得連結」→ 請對應業務到
              CRM 重按一次「產生保固連結」即可
            </li>
            <li>
              <strong>重複打開已完成的連結</strong>：會顯示「此案件保固已完成登記」，這是正常的，不是壞掉
            </li>
          </ul>
        </div>

        {/* 五、FAQ */}
        <div className="flex flex-col gap-4">
          <SectionTitle no="05">常被問的問題</SectionTitle>
          <dl className="flex flex-col gap-4 text-sm leading-relaxed">
            <div>
              <dt className="font-semibold">Q：業主問「我的保固是幾年？」</dt>
              <dd className="mt-1 text-(--dark-accent)">
                答：「保固年限會依完工資訊由公司確認後通知您。」年限與註冊是兩回事，
                <strong className="text-(--black)">先完成註冊最重要</strong>。
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Q：一個案件可以給兩個業主填嗎？</dt>
              <dd className="mt-1 text-(--dark-accent)">
                目前一案一位主要聯絡人。第二位聯絡人的資料請客服在 CRM 訊息紀錄補註。
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Q：設計師不願意轉給業主怎麼辦？</dt>
              <dd className="mt-1 text-(--dark-accent)">
                請設計師代填即可（勾代填、留設計師姓名），一樣算完成註冊。重點是案件資料進到系統。
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Q：舊的保固登記方式（填專案編號）還能用嗎？</dt>
              <dd className="mt-1 text-(--dark-accent)">
                已停用。官網保固頁現在會引導客戶向設計師或業務索取專屬連結。
              </dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-(--accent) pt-6 text-sm text-(--dark-accent)">
          流程或系統問題請找 Michael（michael@saiens.us）。
        </div>
      </section>
    </main>
  );
}
