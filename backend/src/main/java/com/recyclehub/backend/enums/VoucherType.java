package com.recyclehub.backend.enums;

public enum VoucherType {
    BASIC(100, 50),      // 100 points = 50 Dh
    SILVER(200, 120),    // 200 points = 120 Dh
    GOLD(500, 350);      // 500 points = 350 Dh

    private final int requiredPoints;
    private final int valueInDh;

    VoucherType(int requiredPoints, int valueInDh) {
        this.requiredPoints = requiredPoints;
        this.valueInDh = valueInDh;
    }

    public int getRequiredPoints() {
        return requiredPoints;
    }

    public int getValueInDh() {
        return valueInDh;
    }
}
