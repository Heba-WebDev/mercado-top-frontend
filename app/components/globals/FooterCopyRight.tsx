export default function FooterCopyRight() {
  return (
    <>
      <div className="flex flex-col items-center gap-4 pt-6 text-[#666] text-center">
        <div className="text-[#666] w-full md:text-right">
          Images by{" "}
          <a href="https://www.freepik.com/free-psd/3d-illustration-person-with-glasses_27470336.htm?query=default%20user#from_view=detail_alsolike">
            <span className=" underline">Freepik</span>
          </a>
        </div>
        <span className=" md:text-right w-full">
          All rights reserved © {new Date().getFullYear()}
        </span>
      </div>
    </>
  );
}
