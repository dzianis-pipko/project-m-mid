import React, {useRef} from 'react';
import Signature, {SignatureViewRef} from 'react-native-signature-canvas';

interface Props {
  onOK: (signature: string) => void;
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignatureArea: React.FC<Props> = ({onOK, setScrollEnabled}) => {
  const ref = useRef<SignatureViewRef>(null);

  const handleSignature = (signature: string) => {
    console.log(signature);
    onOK(signature);
  };

  const handleEnd = () => {
    ref.current?.readSignature();
    setScrollEnabled(true);
  };

  return (
    <Signature
      // reset styles
      webStyle=".m-signature-pad {
      border: 0px solid #e8e8e8;
      background-color: #F6F6F6;
      box-shadow: 0 0px 0px rgba(0, 0, 0, 0), 0 0 40px rgba(0, 0, 0, 0) inset;
      }
      .m-signature-pad--body {
        border: 0px solid #f4f4f4;
      }
      .m-signature-pad--body
      canvas {
        box-shadow: 0 0 0px rgba(0, 0, 0, 0.02) inset;
      }
    "
      ref={ref}
      onBegin={() => setScrollEnabled(false)}
      onEnd={() => handleEnd()}
      onOK={handleSignature}
      trimWhitespace
    />
  );
};

export default SignatureArea;
