import FooterGradientButton from '@/components/common/button/FooterGradientButton';
import InputCheckButton from '@/components/common/button/InputCheckButton';
import Input from '@/components/common/input/Input';

const FindIdContainer = () => {
  return (
    <section className="mx-5 pt-[104px]">
      <form>
        <Input id="name" label="이름" placeholder="이름을 입력해주세요." />

        <Input id="email" label="이메일" placeholder="ex) latte@example.com">
          <InputCheckButton>인증하기</InputCheckButton>
        </Input>

        <Input id="certification" label="인증번호" placeholder="인증번호 입력">
          <InputCheckButton>확인</InputCheckButton>
        </Input>
        <FooterGradientButton disabled>아이디 찾기</FooterGradientButton>
      </form>
    </section>
  );
};

export default FindIdContainer;
