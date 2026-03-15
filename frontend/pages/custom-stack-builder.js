import BuilderStepper from '../components/BuilderStepper';
import AIStackBuilder from '../components/AIStackBuilder';

const CustomStackBuilderPage = () => {
  return (
    <section className="page-section">
      <div className="content-shell space-y-8">
        <BuilderStepper />
        <AIStackBuilder />
      </div>
    </section>
  );
};

export default CustomStackBuilderPage;
