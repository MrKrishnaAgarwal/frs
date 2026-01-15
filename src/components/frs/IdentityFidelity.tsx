import { Shield, CheckCircle, Fingerprint } from "lucide-react";
import { useTranslation } from "react-i18next";

const IdentityFidelity = () => {
  const { t } = useTranslation();

  const verifications = [
    { label: t("identity.identityMatchConfidence"), value: t("identity.high"), verified: true },
    { label: t("identity.academicRecordConsistency"), value: t("identity.verified"), verified: true },
    { label: t("identity.sourceCrossValidation"), value: t("identity.multipleTrustedSources"), verified: true },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Fingerprint className="w-5 h-5 text-primary" />
        {t("identity.title")}
      </h3>

      <p className="text-sm text-muted-foreground mb-4">
        {t("identity.description")}
      </p>

      <div className="space-y-3">
        {verifications.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
          >
            <span className="text-sm text-foreground">{item.label}</span>
            <span className="flex items-center gap-1 text-sm">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">{item.value}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
        <p className="text-xs text-muted-foreground flex items-start gap-2">
          <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
          {t("identity.purposeNote")}
        </p>
      </div>
    </div>
  );
};

export default IdentityFidelity;